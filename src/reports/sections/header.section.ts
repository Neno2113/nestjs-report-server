import { log } from "console";
import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";


interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean
    showDate?: boolean
}

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0,0,0,20]
}

export const headerSection = ( options: HeaderOptions ):Content => {

    const { title, subtitle, showDate = true, showLogo = true } = options

    const headerLogo:Content =  showLogo ? logo : null;
    const headerDate:Content = showDate ? { text: DateFormatter.getDDMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20]
    }: null;

    const headerTitle:Content = title ? { text: title, style: { 
        bold: true,
        // alignment: 'center',
     }} : null;


    return {
        columns: [
            headerLogo,
            headerTitle,
            headerDate
        ]
    }
}