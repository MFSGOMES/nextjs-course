/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  // Para garantir que as classes informadas sejam carregadas no build de produção
  // Exemplo no botão "Novo cliente"
  safelist: [
    /^bg-/,
    /^to-/,
    /^from-/,
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}
