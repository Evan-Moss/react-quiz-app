import { createTheme }  from '@mui/material/styles'

const greenTheme = createTheme({
  palette: {
    primary: { 500: '#39A9DB' },
    background: {
        default: "#e4f0e2"
    },
  },
})

const purpleTheme = createTheme({
  palette: {
    primary: { 500: '#39A9DB' },
    background: {
        default: "#eee2f0"
    },
  },
})

const pinkTheme = createTheme({
  palette: {
    primary: { 500: '#39A9DB' },
    background: {
        default: "#ffabc7"
    },
  },
})

export { greenTheme, purpleTheme, pinkTheme }