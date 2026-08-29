/** Type declarations for CSS Modules used in web-only components */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
