package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.TareaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tarea and its DTO TareaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TareaMapper extends EntityMapper<TareaDTO, Tarea> {


    @Mapping(target = "servicios", ignore = true)
    Tarea toEntity(TareaDTO tareaDTO);

    default Tarea fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tarea tarea = new Tarea();
        tarea.setId(id);
        return tarea;
    }
}
