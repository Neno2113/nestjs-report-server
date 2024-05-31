import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";

interface ReportValues {
    employeerName: string;
    employeerPosition: string;
    employeName: string;
    employeePosition: string;
    employeeStartDate: string;
    employeeHours: string;
    employeeWorkSchedule: string;
    employeeCompany: string;
}

const style: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    },

    body: {
        alignment: 'justify',
        margin: [0, 50, 0, 70],
    },
    signature: {
        fontSize: 14,
        bold: true,
        // alignment: 'right'
    },
    footer: {
        fontSize: 10,
        alignment: 'center',
        italics: true,
        margin: [0, 20, 0, 0]
    }

}

// const logo: Content = {
//     image: 'src/assets/tucan-code-logo.png',
//     width: 100,
//     height: 100,
//     alignment: 'center',
//     margin: [0,0,0,20]
// }

export const getEmploymentLetterById = ( employee: ReportValues ): TDocumentDefinitions => {

    const docDefinitions: TDocumentDefinitions = {
        styles: style,
        pageMargins: [40, 60, 40, 60],

        header: headerSection({ showLogo: true, showDate: true }),

        // header: {
        //     columns: [logo, {
        //         text: DateFormatter.getDDMMYYYY(new Date()),
        //         alignment: 'right',
        //         margin: [20, 20]
        //     }]
        // },
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header'
            },
            {
                text: `Yo, ${ employee.employeName}, en mi calidad de ${employee.employeerPosition} de ${employee.employeeCompany}, 
                por medio de la presente certifco que [Nombre del Empleado] ha sido empleado en nuestra 
                empresa desde el ${ DateFormatter.getDDMMYYYY( new Date(employee.employeeStartDate))}.\n
                Durante su empleo, el Sr./Sra. ${employee.employeName} ha desempeñado el cargo de ${employee.employeePosition}, 
                demostrando responsabilidad, compromiso y habilidades profesionales en sus 
                labores.\n
                La jornada laboral del Sr./ Sra. ${employee.employeName}  es de ${employee.employeeHours} horas 
                semanales, con un horario de ${employee.employeeWorkSchedule}, cumpliendo con las políticas y 
                procedimientos establecidos por la empresa.\n
                Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.`,
                style: 'body'

            }, 
            {
                text: `Atentamente,`,
                style: 'signature'
            },
            {
                text:`${employee.employeerName}`,
                style: 'signature'
            },
            {
                text:`${employee.employeerPosition}`,
                style: 'signature'
            },
            {
                text:`${employee.employeeCompany}`,
                style: 'signature'
            },
            {
                text:`${ DateFormatter.getDDMMYYYY(new Date())}`,
                style: 'signature'
            },
           
        ],
        footer: {
            text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
            style: 'footer'
        }


    }
    
    








    return docDefinitions;
}