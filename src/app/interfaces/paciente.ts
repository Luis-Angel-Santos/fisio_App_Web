export interface Paciente {
    nombre: string,
    apellidos: string,
    correo: string,
    telefono: number,
    foto?: File,
    id?: string,
    expedienteMedico?: JSON,
    recetasAsignadas?: JSON
}
