import React from 'preact'

export function SettingToggleButton() {
  const { openSetting, settingDialog, onClickHandler } = this.props
  return (
    <div className={`w-6 h-6 mr-8`}>
      <button onClick={onClickHandler}>
        {/* SVG icon from fontawesome 5 (fas fa-cog) */}
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='cog'
          class='svg-inline--fa fa-cog fa-w-16'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path
            fill='currentColor'
            d='M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z'
          />
        </svg>
      </button>
      {openSetting && settingDialog}
    </div>
  )
}

export function SettingDialog({
  discardHandler,
  themeChangeHandler,
  maxImageChangeHandler,
  themes,
  currentTheme,
  maxImageWidth,
  borderImage,
  borderChangeHandler,
}) {
  const themeSelector = (
    <div>
      <label htmlFor='theme-selector'>Theme color</label>
      <select
        name='theme-selector'
        className={`block w-full bg-primary text-primary border py-1 px-2 mt-2`}
        onChange={themeChangeHandler}
      >
        {themes.map((theme, index) => (
          <option key={theme.name} value={index} selected={theme.name === currentTheme ? true : false}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )

  const imageWidthLimit = (
    <div className={`mt-3`}>
      <label htmlFor='max-image-width'>Maximum image width</label>
      <input
        type='number'
        name='max-image-width'
        className={`block w-full bg-primary border py-1 px-2`}
        placeholder='Value in pixel (leave blank to default 100%)'
        value={maxImageWidth && maxImageWidth}
        onChange={maxImageChangeHandler}
      />
    </div>
  )

  const withBorderSetting = (
    <div className='mt-3'>
      <input
        type='checkbox'
        id='enable-image-border'
        className='inline-block'
        checked={borderImage}
        onChange={borderChangeHandler}
      />
      <label htmlFor='enable-image-border' className='ml-3'>
        Enable Border Top of Image
      </label>
    </div>
  )

  return (
    <div className={`fixed top-12 inset-x-0 bg-secondary p-3 border mx-auto w-1/4`}>
      <h2 className={`font-medium text-lg border-b mb-3`}>Settings</h2>
      {themeSelector}
      {imageWidthLimit}
      {withBorderSetting}
      <hr className={`border-b`} />
      <button className={`button border py-1 px-2 text-xs float-right`} onClick={discardHandler}>
        Save Settings
      </button>
    </div>
  )
}
