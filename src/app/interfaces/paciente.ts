export interface Paciente {
    nombre: string,
    apellidos: string,
    correo: string,
    telefono: number,
    foto?: string,
    id?: string,
    idExpedienteMedico?: string,
    expedienteMedico?: ExpedienteMedico,
    recetasAsignadas?: JSON
}

export interface ExpedienteMedico{
    alimentacion: string;
    pasatiempos: string;
    religion: string;
    ejercicio: string;
    alcohol: string;
    drogas: string;
    fuma: string;
    sarampion: string;
    rubeola: string;
    varicela: string;
    escarlatina: string;
    polomelitis: string;
    hepatitis: string;
    transfuciones: string;
    cancer: string;
    asma: string;
    diabetes: string;
    hipertension: string;
    obesidad: string;
    alergias: string;
    cirugias: string;
    peso: string;
    talla: string;
    ta: string;
    fc: string;
    fr: string;
    datosSubjetivos: string;
    datosObjetivos: string;
    estudiosDiagnosticos: string;
    impresionDiagnosticos: string;
    diagnostico: string;
    pronostico: string;
    tratamiento: string;
    evolucion: string;
}