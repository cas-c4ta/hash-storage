// FX Hash Random
let fxhash;
let fxrand;
function BuildFxhash() {
  //--- Random mit fxhash ----
  let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  fxhash =
    "oo" +
    Array(49)
      .fill(0)
      .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
      .join("");

  //--- --> seed für URL ----
  const params = new URLSearchParams(location.search);
  if (params.has("seed")) {
    const seed = params.get("seed");
    fxhash = seed;
  }

  //--- Random mit fxhash ----
  let b58dec = (str) =>
    [...str].reduce(
      (p, c) => (p * alphabet.length + alphabet.indexOf(c)) | 0,
      0
    );
  let fxhashTrunc = fxhash.slice(2);
  let regex = new RegExp(".{" + ((fxhashTrunc.length / 4) | 0) + "}", "g");
  let hashes = fxhashTrunc.match(regex).map((h) => b58dec(h));
  let sfc32 = (a, b, c, d) => {
    return () => {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      var t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  };
  fxrand = sfc32(...hashes);

  console.log(`new FxHash: ${fxhash}`)
  return fxhash;
}