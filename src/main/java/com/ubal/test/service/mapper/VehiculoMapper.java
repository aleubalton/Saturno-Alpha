package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.VehiculoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vehiculo and its DTO VehiculoDTO.
 */
@Mapper(componentModel = "spring", uses = {ModeloMapper.class})
public interface VehiculoMapper extends EntityMapper<VehiculoDTO, Vehiculo> {

    @Mapping(source = "modelo.id", target = "modeloId")
    @Mapping(source = "modelo.nombre", target = "modeloNombre")
    VehiculoDTO toDto(Vehiculo vehiculo);

    @Mapping(target = "turnos", ignore = true)
    @Mapping(source = "modeloId", target = "modelo")
    Vehiculo toEntity(VehiculoDTO vehiculoDTO);

    default Vehiculo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setId(id);
        return vehiculo;
    }
}
