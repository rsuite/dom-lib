let populated = false;

// Browsers
let ie;
let firefox;
let opera;
let webkit;
let chrome;

// Actual IE browser for compatibility mode
let ieRealVersion;

// Platforms
let osx;
let windows;
let linux;
let android;

// Architectures
let win64;

// Devices
let iphone;
let ipad;
let native;

let mobile;

function populate(): null {
  if (populated) {
    return;
  }

  populated = true;

  // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
  const uas = navigator.userAgent;
  let agent =
    /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
      uas
    );
  const os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  ipad = /\b(iP[ao]d)/.exec(uas);
  android = /Android/i.exec(uas);
  native = /FBAN\/\w+;/i.exec(uas);
  mobile = /Mobile/i.exec(uas);

  // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.
  win64 = !!/Win64/.exec(uas);

  if (agent) {
    if (agent[1]) {
      ie = parseFloat(agent[1]);
    } else {
      ie = agent[5] ? parseFloat(agent[5]) : NaN;
    }

    // IE compatibility mode
    // @ts-ignore
    if (ie && document && document.documentMode) {
      // @ts-ignore
      ie = document.documentMode;
    }
    // grab the "true" ie version from the trident token if available
    const trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    ieRealVersion = trident ? parseFloat(trident[1]) + 4 : ie;

    firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    opera = agent[3] ? parseFloat(agent[3]) : NaN;
    webkit = agent[4] ? parseFloat(agent[4]) : NaN;
    if (webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      chrome = NaN;
    }
  } else {
    ie = NaN;
    firefox = NaN;
    opera = NaN;
    chrome = NaN;
    webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      const ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      osx = false;
    }
    windows = !!os[2];
    linux = !!os[3];
  } else {
    osx = false;
    windows = false;
    linux = false;
  }
}

/**
 * @deprecated
 */
const UserAgent = {
  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: (): boolean => populate() || ie,

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: (): boolean => populate() || ieRealVersion > ie,

  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: (): boolean => UserAgent.ie() && win64,

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: (): boolean => populate() || firefox,

  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: (): boolean => populate() || opera,

  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: (): boolean => populate() || webkit,

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: (): boolean => UserAgent.webkit(),

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome: (): boolean => populate() || chrome,

  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: (): boolean => populate() || windows,

  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: (): boolean => populate() || osx,

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: (): boolean => populate() || linux,

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: (): boolean => populate() || iphone,
  mobile: (): boolean => populate() || iphone || ipad || android || mobile,

  // webviews inside of the native apps
  nativeApp: (): boolean => populate() || native,
  android: (): boolean => populate() || android,
  ipad: (): boolean => populate() || ipad
};

export default UserAgent;
