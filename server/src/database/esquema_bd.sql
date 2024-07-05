CREATE TABLE t_usuario (
  id_usuario SERIAL PRIMARY KEY,
  id_persona INTEGER,
  nombre_usuario VARCHAR,
  password VARCHAR,
  perfil VARCHAR,
  estado BOOLEAN
);

CREATE TABLE t_persona (
  id_persona SERIAL PRIMARY KEY,
  nombre VARCHAR,
  ap_paterno VARCHAR,
  ap_materno VARCHAR,
  dni VARCHAR,
  telefono VARCHAR,
  correo VARCHAR,
  direccion VARCHAR
);

CREATE TABLE t_expediente (
  id_expediente SERIAL PRIMARY KEY,
  id_inventario INTEGER,
  id_responsable INTEGER,
  nombre_expediente VARCHAR,
  fojas INTEGER,
  fojas_unacara INTEGER,
  fojas_doscaras INTEGER,
  fojas_obs VARCHAR,
  copias_originales BOOLEAN,
  copias_simples BOOLEAN,
  juzgado_origen VARCHAR,
  tipo_proceso VARCHAR,
  materia VARCHAR,
  demandante VARCHAR,
  demandado VARCHAR,
  fecha_inicial date,
  fecha_final date,
  estado_preparado BOOLEAN,
  estado_digitalizado BOOLEAN,
  estado_indizado BOOLEAN,
  estado_controlado BOOLEAN,
  estado_fedatado BOOLEAN
);

CREATE TABLE t_inventario (
  id_inventario SERIAL PRIMARY KEY,
  id_supervisor INTEGER,
  anio INTEGER,
  cantidad INTEGER,
  tipo_doc VARCHAR,
  serie_doc VARCHAR,
  especialidad_inventario VARCHAR,
  contador INTEGER,
  estado_preparado BOOLEAN
);

CREATE TABLE t_digitalizacion (
  id_digitalizacion SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  id_responsable INTEGER,
  fojas INTEGER,
  fojas_unacara INTEGER,
  fojas_doscaras INTEGER,
  fojas_obs VARCHAR,
  ocr BOOLEAN,
  escala_gris BOOLEAN,
  color BOOLEAN,
  observaciones VARCHAR,
  documento TEXT,
  peso_doc INTEGER,
  estado_concluido BOOLEAN
);

CREATE TABLE t_control_calidad (
  id_controlcalidad SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  id_responsable INTEGER,
  observacion VARCHAR,
  formato BOOLEAN,
  peso BOOLEAN,
  nitidez BOOLEAN,
  pruebas BOOLEAN,
  estado_concluido BOOLEAN
);

CREATE TABLE t_indizacion (
  id_indizacion SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  id_responsable INTEGER,
  indizacion VARCHAR,
  observaciones VARCHAR,
  estado_concluido BOOLEAN
);

CREATE TABLE t_fedatar (
  id_fedatar SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  id_responsable INTEGER,
  observaciones VARCHAR,
  estado_concluido BOOLEAN
);

CREATE TABLE t_proceso (
  id_proceso SERIAL PRIMARY KEY,
  nro_proceso INTEGER,
  descripcion VARCHAR
);


-- Relaciones
ALTER TABLE t_expediente
ADD CONSTRAINT fk_expediente_inventario FOREIGN KEY (id_inventario) REFERENCES t_inventario(id_inventario);

ALTER TABLE t_usuario
ADD CONSTRAINT fk_usuario_persona FOREIGN KEY (id_persona) REFERENCES t_persona(id_persona);

ALTER TABLE t_inventario
ADD CONSTRAINT fk_inventario_supervisor FOREIGN KEY (id_supervisor) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_digitalizacion
ADD CONSTRAINT fk_digitalizacion_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_digitalizacion
ADD CONSTRAINT fk_digitalizacion_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_control_calidad
ADD CONSTRAINT fk_controlcalidad_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_control_calidad
ADD CONSTRAINT fk_controlcalidad_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_indizacion
ADD CONSTRAINT fk_indizacion_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_indizacion
ADD CONSTRAINT fk_indizacion_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_fedatar
ADD CONSTRAINT fk_fedatar_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_fedatar
ADD CONSTRAINT fk_fedatar_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_expediente
ADD CONSTRAINT fk_expediente_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);


--ESQUEMA DE BASE DE DATOS
table t_usuario{
  id_usuario integer [primary key]
  id_persona integer
  nombre_usuario varchar 
  password varchar
  perfil varchar
  estado bool
}

table t_persona{
  id_persona integer [primary key]
  nombre varchar
  ap_paterno varchar
  ap_materno varchar
  dni varchar
  telefono varchar
  correo varchar
  direccion varchar
}

// tabla principal
table t_expediente{
  id_expediente integer [primary key]
  id_inventario integer
  id_responsable integer
  nombre_expediente varchar
  fojas integer
  fojas_unacara integer
  fojas_doscaras integer
  fojas_obs varchar
  copias_originales bool
  copias_simples bool
  juzgado_origen varchar
  tipo_proceso varchar
  materia varchar
  demandante varchar
  demandado varchar
  fecha_inicial date
  fecha_final date
  estado_preparado bool
  estado_digitalizado bool
  estado_indizado bool
  estado_controlado bool
  estado_fedatado bool
}

table t_inventario{
  id_inventario integer [primary key]
  id_supervisor integer
  anio integer
  cantidad integer
  tipo_doc varchar
  serie_doc varchar
  especialidad_inventario varchar
  contador integer
  estado_preparado bool
 
}

table t_digitalizacion{
  id_digitalizacion integer [primary key]
  id_expediente integer
  id_responsable integer
  fojas integer
  fojas_unacara integer
  fojas_doscaras integer
  ocr bool
  escala_gris bool
  color bool
  observaciones varchar
  documento text
  peso_doc integer
  estado_concluido bool
  
}

table t_control_calidad{
  id_controlcalidad integer [primary key]
  id_expediente integer
  id_responsable integer
  observacion varchar
  formato bool
  peso bool
  nitidez bool
  pruebas bool
  estado_concluido bool

}

table t_indizacion{
   id_indizacion integer [primary key]
   id_expediente integer
   id_responsable integer
  
   indizacion varchar
   observaciones varchar
   estado_concluido bool
}

table t_fedatar{
  id_fedatar integer [primary key]
  id_expediente integer
  id_responsable integer
  observaciones varchar
  estado_concluido bool
}

//RELACIONES
//R1: de inventario a expediente (1:N)
ref: t_inventario.id_inventario < t_expediente.id_inventario
//R2: de persona a ususario (1:N)
ref: t_persona.id_persona < t_usuario.id_persona
//R3: de usuario a inventario (1:N)
ref: t_usuario.id_usuario < t_inventario.id_supervisor
//R4: de expediente a digitacion (1:1)
ref: t_expediente.id_expediente - t_digitalizacion.id_expediente
//R5: de usuario a digitalizacion (1:N)
ref: t_usuario.id_usuario < t_digitalizacion.id_responsable
//R6: de expediente a control de calidad (1:1)
ref: t_expediente.id_expediente - t_control_calidad.id_expediente
//R7: de usario a control de calidad(1:N) 
ref: t_usuario.id_usuario < t_control_calidad.id_responsable
//R8: de expediente a indizacion (1:1)
ref: t_expediente.id_expediente - t_indizacion.id_expediente
//R9: de usuario a indizacion (1:N)
ref: t_usuario.id_usuario < t_indizacion.id_responsable
//R10: de expediente a fedatar (1:1)
ref: t_expediente.id_expediente - t_fedatar.id_expediente
//R11: de usuario a fedatar (1:N)
ref: t_usuario.id_usuario < t_fedatar.id_responsable
//R16: de un usuario a un expediente (1:N)
ref: t_usuario.id_usuario < t_expediente.id_responsable