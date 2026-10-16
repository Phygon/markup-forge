export const themeOptions = [
  { id: "aurora-x", label: "Aurora X" },
  { id: "dracula", label: "Dracula" },
  { id: "flexoki-dark", label: "Flexoki Dark" },
  { id: "flexoki-light", label: "Flexoki Light" },
  { id: "github-dark", label: "GitHub Dark" },
  { id: "github-light", label: "GitHub Light" },
  { id: "gruvbox-dark", label: "Gruvbox Dark" },
  { id: "gruvbox-light", label: "Gruvbox Light" },
  { id: "monokai", label: "Monokai" },
  { id: "night-owl", label: "Night Owl" },
  { id: "nord", label: "Nord" },
  { id: "one-dark", label: "Atom One Dark" },
  { id: "solarized-dark", label: "Solarized Dark" },
  { id: "solarized-light", label: "Solarized Light" },
];

export const themes = {
  "aurora-x": {
    monacoTheme: "markup-forge-aurora-x",
    vars: { "--app-bg": "#0b0e14", "--panel-bg": "#151a24", "--editor-bg": "#0b0e14", "--text": "#bfbdb6", "--muted": "#6c7380", "--heading": "#e6e1cf", "--border": "#303744", "--accent": "#59c2ff", "--link": "#59c2ff", "--code-bg": "#151a24", "--selection": "#25374a" },
    tokens: { comment: "6c7380", constant: "d2a6ff", error: "f07178", function: "59c2ff", info: "59c2ff", inserted: "aad94c", keyword: "ff8f40", number: "d2a6ff", operator: "f29668", property: "95e6cb", punctuation: "bfbdb6", string: "c2d94c", type: "ffb454", url: "59c2ff", warning: "ffb454" },
  },
  "dracula": {
    monacoTheme: "markup-forge-dracula",
    vars: { "--app-bg": "#282a36", "--panel-bg": "#44475a", "--editor-bg": "#282a36", "--text": "#f8f8f2", "--muted": "#6272a4", "--heading": "#f8f8f2", "--border": "#6272a4", "--accent": "#8be9fd", "--link": "#8be9fd", "--code-bg": "#44475a", "--selection": "#44475a" },
    tokens: { comment: "6272a4", constant: "bd93f9", error: "ff5555", function: "50fa7b", info: "8be9fd", inserted: "50fa7b", keyword: "ff79c6", number: "bd93f9", operator: "ff79c6", property: "8be9fd", punctuation: "f8f8f2", string: "f1fa8c", type: "8be9fd", url: "8be9fd", warning: "ffb86c" },
  },
  "flexoki-dark": {
    monacoTheme: "markup-forge-flexoki-dark",
    vars: { "--app-bg": "#100F0F", "--panel-bg": "#1C1B1A", "--editor-bg": "#100F0F", "--text": "#CECDC3", "--muted": "#878580", "--heading": "#CECDC3", "--border": "#343331", "--accent": "#3AA99F", "--link": "#4385BE", "--code-bg": "#1C1B1A", "--selection": "#343331" },
    tokens: { comment: "878580", constant: "CECDC3", error: "D14D41", function: "DA702C", info: "4385BE", inserted: "879A39", keyword: "879A39", number: "8B7EC8", operator: "D14D41", property: "4385BE", punctuation: "878580", string: "3AA99F", type: "D0A215", url: "4385BE", variable: "CECDC3", warning: "DA702C", debug: "4385BE", trace: "878580" },
  },
  "flexoki-light": {
    monacoTheme: "markup-forge-flexoki-light",
    vars: { "--app-bg": "#FFFCF0", "--panel-bg": "#F2F0E5", "--editor-bg": "#FFFCF0", "--text": "#100F0F", "--muted": "#6F6E69", "--heading": "#100F0F", "--border": "#DAD8CE", "--accent": "#24837B", "--link": "#205EA6", "--code-bg": "#F2F0E5", "--selection": "#E6E4D9" },
    tokens: { comment: "6F6E69", constant: "100F0F", error: "AF3029", function: "BC5215", info: "205EA6", inserted: "66800B", keyword: "66800B", number: "5E409D", operator: "AF3029", property: "205EA6", punctuation: "6F6E69", string: "24837B", type: "AD8301", url: "205EA6", variable: "100F0F", warning: "BC5215", debug: "205EA6", trace: "6F6E69" },
  },
  "github-dark": {
    monacoTheme: "markup-forge-github-dark",
    vars: { "--app-bg": "#0d1117", "--panel-bg": "#161b22", "--editor-bg": "#0d1117", "--text": "#c9d1d9", "--muted": "#8b949e", "--heading": "#f0f6fc", "--border": "#30363d", "--accent": "#58a6ff", "--link": "#58a6ff", "--code-bg": "#161b22", "--selection": "#264f78" },
    tokens: { comment: "8b949e", constant: "79c0ff", error: "ff7b72", function: "d2a8ff", info: "58a6ff", inserted: "7ee787", keyword: "ff7b72", number: "79c0ff", operator: "ff7b72", property: "79c0ff", punctuation: "c9d1d9", string: "a5d6ff", type: "ffa657", url: "a5d6ff", warning: "d29922" },
  },
  "github-light": {
    monacoTheme: "markup-forge-github-light",
    vars: { "--app-bg": "#ffffff", "--panel-bg": "#f6f8fa", "--editor-bg": "#ffffff", "--text": "#1f2328", "--muted": "#656d76", "--heading": "#1f2328", "--border": "#d0d7de", "--accent": "#0969da", "--link": "#0969da", "--code-bg": "#f6f8fa", "--selection": "#b6d7ff" },
    tokens: { comment: "6e7781", constant: "0550ae", error: "cf222e", function: "8250df", info: "0969da", inserted: "116329", keyword: "cf222e", number: "0550ae", operator: "cf222e", property: "0550ae", punctuation: "1f2328", string: "0a3069", type: "953800", url: "0969da", warning: "9a6700" },
  },
  "solarized-dark": {
    monacoTheme: "markup-forge-solarized-dark",
    vars: { "--app-bg": "#002b36", "--panel-bg": "#073642", "--editor-bg": "#002b36", "--text": "#839496", "--muted": "#586e75", "--heading": "#93a1a1", "--border": "#586e75", "--accent": "#2aa198", "--link": "#268bd2", "--code-bg": "#073642", "--selection": "#174a55" },
    tokens: { comment: "586e75", constant: "d33682", error: "dc322f", function: "268bd2", info: "268bd2", inserted: "859900", keyword: "859900", number: "d33682", operator: "859900", property: "b58900", punctuation: "839496", string: "2aa198", type: "b58900", url: "2aa198", warning: "b58900" },
  },
  "solarized-light": {
    monacoTheme: "markup-forge-solarized-light",
    vars: { "--app-bg": "#fdf6e3", "--panel-bg": "#eee8d5", "--editor-bg": "#fdf6e3", "--text": "#657b83", "--muted": "#93a1a1", "--heading": "#586e75", "--border": "#93a1a1", "--accent": "#2aa198", "--link": "#268bd2", "--code-bg": "#eee8d5", "--selection": "#d9d2b8" },
    tokens: { comment: "93a1a1", constant: "d33682", error: "dc322f", function: "268bd2", info: "268bd2", inserted: "859900", keyword: "859900", number: "d33682", operator: "859900", property: "b58900", punctuation: "657b83", string: "2aa198", type: "b58900", url: "268bd2", warning: "b58900" },
  },
  "gruvbox-dark": {
    monacoTheme: "markup-forge-gruvbox-dark",
    vars: { "--app-bg": "#282828", "--panel-bg": "#3c3836", "--editor-bg": "#282828", "--text": "#d5c4a1", "--muted": "#a89984", "--heading": "#ebdbb2", "--border": "#665c54", "--accent": "#83a598", "--link": "#83a598", "--code-bg": "#3c3836", "--selection": "#504945" },
    tokens: { comment: "928374", constant: "d3869b", error: "fb4934", function: "83a598", info: "83a598", inserted: "b8bb26", keyword: "fb4934", number: "d3869b", operator: "fe8019", property: "fabd2f", punctuation: "d5c4a1", string: "b8bb26", type: "fabd2f", url: "83a598", warning: "fabd2f" },
  },
  "gruvbox-light": {
    monacoTheme: "markup-forge-gruvbox-light",
    vars: { "--app-bg": "#fbf1c7", "--panel-bg": "#f2e5bc", "--editor-bg": "#fbf1c7", "--text": "#504945", "--muted": "#928374", "--heading": "#3c3836", "--border": "#d5c4a1", "--accent": "#076678", "--link": "#076678", "--code-bg": "#f2e5bc", "--selection": "#ebdbb2" },
    tokens: { comment: "928374", constant: "8f3f71", error: "9d0006", function: "076678", info: "076678", inserted: "79740e", keyword: "9d0006", number: "8f3f71", operator: "af3a03", property: "b57614", punctuation: "504945", string: "79740e", type: "b57614", url: "076678", warning: "b57614" },
  },
  "one-dark": {
    monacoTheme: "markup-forge-one-dark",
    vars: { "--app-bg": "#282c34", "--panel-bg": "#21252b", "--editor-bg": "#282c34", "--text": "#abb2bf", "--muted": "#7f848e", "--heading": "#e6e6e6", "--border": "#3e4451", "--accent": "#61afef", "--link": "#61afef", "--code-bg": "#21252b", "--selection": "#3e4451" },
    tokens: { comment: "5c6370", constant: "d19a66", error: "e06c75", function: "61afef", info: "61afef", inserted: "98c379", keyword: "c678dd", number: "d19a66", operator: "56b6c2", property: "e06c75", punctuation: "abb2bf", string: "98c379", type: "e5c07b", url: "61afef", warning: "e5c07b" },
  },
  "monokai": {
    monacoTheme: "markup-forge-monokai",
    vars: { "--app-bg": "#272822", "--panel-bg": "#3e3d32", "--editor-bg": "#272822", "--text": "#f8f8f2", "--muted": "#75715e", "--heading": "#f8f8f2", "--border": "#49483e", "--accent": "#66d9ef", "--link": "#66d9ef", "--code-bg": "#3e3d32", "--selection": "#49483e" },
    tokens: { comment: "75715e", constant: "ae81ff", error: "f92672", function: "a6e22e", info: "66d9ef", inserted: "a6e22e", keyword: "f92672", number: "ae81ff", operator: "f92672", property: "a6e22e", punctuation: "f8f8f2", string: "e6db74", type: "66d9ef", url: "66d9ef", warning: "fd971f" },
  },
  "nord": {
    monacoTheme: "markup-forge-nord",
    vars: { "--app-bg": "#2e3440", "--panel-bg": "#3b4252", "--editor-bg": "#2e3440", "--text": "#d8dee9", "--muted": "#616e88", "--heading": "#eceff4", "--border": "#4c566a", "--accent": "#88c0d0", "--link": "#81a1c1", "--code-bg": "#3b4252", "--selection": "#434c5e" },
    tokens: { comment: "616e88", constant: "b48ead", error: "bf616a", function: "88c0d0", info: "81a1c1", inserted: "a3be8c", keyword: "81a1c1", number: "b48ead", operator: "81a1c1", property: "8fbcbb", punctuation: "d8dee9", string: "a3be8c", type: "8fbcbb", url: "88c0d0", warning: "ebcb8b" },
  },
  "night-owl": {
    monacoTheme: "markup-forge-night-owl",
    vars: { "--app-bg": "#011627", "--panel-bg": "#0b253a", "--editor-bg": "#011627", "--text": "#d6deeb", "--muted": "#7fdbca", "--heading": "#ffffff", "--border": "#234d70", "--accent": "#82aaff", "--link": "#82aaff", "--code-bg": "#0b253a", "--selection": "#1d3b53" },
    tokens: { comment: "637777", constant: "addb67", error: "ef5350", function: "82aaff", info: "82aaff", inserted: "addb67", keyword: "c792ea", number: "f78c6c", operator: "7fdbca", property: "80cbc4", punctuation: "d6deeb", string: "ecc48d", type: "ffcb8b", url: "82aaff", warning: "ffcb6b" },
  },
};

const tokenFallbacks = {
  attr: "property",
  "code-inline": "string",
  command: "keyword",
  deleted: "error",
  heading: "type",
  link: "url",
  literal: "constant",
  meta: "comment",
  selector: "property",
  tag: "type",
  variable: "info",
  debug: "info",
  trace: "comment",
};

Object.values(themes).forEach(({ tokens }) => {
  Object.entries(tokenFallbacks).forEach(([token, fallback]) => {
    if (!tokens[token] && tokens[fallback]) tokens[token] = tokens[fallback];
  });
});

export function currentTheme(id) {
  return themes[id] || themes["github-dark"];
}

export function normalizeTheme(id) {
  return Object.prototype.hasOwnProperty.call(themes, id)
    ? id
    : "github-dark";
}

export function createThemeTokenCss() {
  return Object.entries(themes)
    .map(([themeId, definition]) =>
      Object.entries(definition.tokens)
        .map(
          ([token, color]) =>
            `.markdown-renderer[data-theme="${themeId}"] .th-${token} { color: #${color}; }`,
        )
        .join("\n"),
    )
    .join("\n");
}
