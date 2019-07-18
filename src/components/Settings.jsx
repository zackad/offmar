import React from 'preact'

export function SettingToggleButton() {
  const { openSetting, settingDialog, onClickHandler } = this.props
  return (
    <div className={``}>
      <button onClick={onClickHandler}>Setting Button - {openSetting ? 'Open' : 'Close'}</button>
      {openSetting && settingDialog}
    </div>
  )
}

export function SettingDialog({ discardHandler }) {
  return (
    <div className={`fixed top-12 inset-x-0 bg-secondary p-3 border mx-auto w-1/4`}>
      <h2 className={`font-medium`}>Settings</h2>
      <hr className={`border-b`} />
      <button className={`button border py-1 px-2 ml-2 text-xs float-right`}>Save Settings</button>
      <button className={`button border py-1 px-2 text-xs float-right`} onClick={discardHandler}>
        Discard Changes
      </button>
    </div>
  )
}
