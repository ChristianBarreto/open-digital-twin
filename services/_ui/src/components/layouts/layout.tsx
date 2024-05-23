import '../../app/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
export { ThemeProvider };
import { Header } from '../general/Header'
 
export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Header />
      <div className='mx-auto'>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}