import React from 'preact'
import natsort from 'natsort'
import DirListing from './DirListing.jsx'
import Reader from './Reader.jsx'
import { SettingToggleButton, SettingDialog } from './Settings.jsx'

export default class Offmar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      openSetting: false,
      theme: 'theme-black',
      themes: ['theme-black', 'theme-dark', 'theme-gray', 'theme-light'],
      activeTheme: 0,
      directories: [],
      files: [],
      images: [],
    }

    this.closeSettingDialog = this.closeSettingDialog.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.settingToggleButtonHandler = this.settingToggleButtonHandler.bind(this)
  }

  componentDidMount() {
    const items = this.props.listItems
      .map(item => {
        item.href = item.href.replace(/\/+\s*$/, '')
        return item
      })
      .sort(natsort({ insensitive: true }))

    const directories = items.filter(item => item.className === 'dir')

    const files = items.filter(item => item.className === 'file')

    const regexFilter = new RegExp('.jpe?g$|.png$|.gif$', 'i')
    const images = files.filter(image => image.href.match(regexFilter))

    this.setState({
      directories: directories,
      files: files,
      images: images,
    })

    document.addEventListener('keydown', this.handleKeydown)

    let activeTheme = GM_getValue('activeTheme', 0)
    this.setState({
      theme: this.state.themes[activeTheme],
      activeTheme: activeTheme,
    })
  }

  handleKeydown(event) {
    const keyCode = event.keyCode

    switch (keyCode) {
      // 'Enter/Return' key
      case 13:
        if (this.state.images.length > 0) {
          this.setState({ mode: 'reader' })
        }
        break
      // ';' (Semicolon)
      case 59:
        const activeTheme = this.state.activeTheme < this.state.themes.length - 1 ? this.state.activeTheme + 1 : 0
        this.setState({
          theme: this.state.themes[activeTheme],
          activeTheme: activeTheme,
        })
        GM_setValue('activeTheme', activeTheme)
        break
      // '\' key
      case 220:
        this.setState({ mode: 'list' })
        break
    }
  }

  closeSettingDialog() {
    this.setState({ openSetting: false })
  }

  settingToggleButtonHandler() {
    this.setState(prevState => ({ openSetting: !prevState.openSetting }))
  }

  render() {
    const settingDialog = <SettingDialog discardHandler={this.closeSettingDialog} />
    const settingToggleButton = (
      <SettingToggleButton
        openSetting={this.state.openSetting}
        settingDialog={settingDialog}
        onClickHandler={this.settingToggleButtonHandler}
      />
    )
    const list = (
      <DirListing directories={this.state.directories} files={this.state.files} settingButton={settingToggleButton} />
    )

    const reader = <Reader images={this.state.images} settingButton={settingToggleButton} />

    return (
      <div className={`${this.state.theme} min-h-screen bg-primary text-primary`}>
        {this.state.mode === 'list' ? list : reader}
      </div>
    )
  }
}
