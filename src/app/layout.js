import "./globals.css";

// Fix for: TypeError: localStorage.getItem is not a function
if (typeof global.localStorage !== 'undefined') {
  try {
    if (typeof global.localStorage.getItem !== 'function') {
      // If localStorage is defined but broken (e.g. missing getItem), remove it
      // so that checks for typeof localStorage === 'undefined' work correctly.
      delete global.localStorage;
    }
  } catch (e) {
    console.error('Error fixing global.localStorage:', e);
  }
}



export const metadata = {
  title: "Luthira Abeykoon",
  description: "B/W",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favico.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
