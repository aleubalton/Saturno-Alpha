package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.TurnoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Turno and its DTO TurnoDTO.
 */
@Mapper(componentModel = "spring", uses = {AgendaMapper.class, VehiculoMapper.class, ServicioMapper.class, ClienteMapper.class})
public interface TurnoMapper extends EntityMapper<TurnoDTO, Turno> {

    @Mapping(source = "agenda.id", target = "agendaId")
    @Mapping(source = "agenda.nombre", target = "agendaNombre")
    @Mapping(source = "vehiculo.id", target = "vehiculoId")
    @Mapping(source = "vehiculo.patente", target = "vehiculoPatente")
    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.apellido", target = "clienteApellido")
    TurnoDTO toDto(Turno turno);

    @Mapping(source = "agendaId", target = "agenda")
    @Mapping(source = "vehiculoId", target = "vehiculo")
    @Mapping(source = "clienteId", target = "cliente")
    Turno toEntity(TurnoDTO turnoDTO);

    default Turno fromId(Long id) {
        if (id == null) {
            return null;
        }
        Turno turno = new Turno();
        turno.setId(id);
        return turno;
    }
}
