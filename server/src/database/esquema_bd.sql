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
  observaciones VARCHAR,
  lote INTEGER,
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
  juzgado_origen VARCHAR,
  tipo_proceso VARCHAR,
  materia VARCHAR,
  demandante VARCHAR,
  demandado VARCHAR,
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

CREATE TABLE t_parte (
  id_parte SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  nombre_parte VARCHAR,
  ap_parte VARCHAR,
  am_parte VARCHAR,
  dni VARCHAR,
  tipo_parte VARCHAR
);

CREATE TABLE t_proceso (
  id_proceso SERIAL PRIMARY KEY,
  nro_proceso INTEGER,
  descripcion VARCHAR
);

CREATE TABLE t_leyenda (
  id_leyenda SERIAL PRIMARY KEY,
  id_expediente INTEGER,
  id_proceso INTEGER,
  id_responsable INTEGER,
  fecha_creacion DATE
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

ALTER TABLE t_parte
ADD CONSTRAINT fk_parte_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_leyenda
ADD CONSTRAINT fk_leyenda_expediente FOREIGN KEY (id_expediente) REFERENCES t_expediente(id_expediente);

ALTER TABLE t_leyenda
ADD CONSTRAINT fk_leyenda_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);

ALTER TABLE t_leyenda
ADD CONSTRAINT fk_leyenda_proceso FOREIGN KEY (id_proceso) REFERENCES t_proceso(id_proceso);

ALTER TABLE t_expediente
ADD CONSTRAINT fk_expediente_responsable FOREIGN KEY (id_responsable) REFERENCES t_usuario(id_usuario);
