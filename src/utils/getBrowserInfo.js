export default function getBrowserInfo() {
    return {
      'Browser': navigator.userAgent,
      'Language': navigator.language,
      'Platform': navigator.platform,
      'Screen Resolution': `${window.screen.width}x${window.screen.height}`,
      'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  