package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.PersonaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Persona and its DTO PersonaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PersonaMapper extends EntityMapper<PersonaDTO, Persona> {


    @Mapping(target = "mascotas", ignore = true)
    Persona toEntity(PersonaDTO personaDTO);

    default Persona fromId(Long id) {
        if (id == null) {
            return null;
        }
        Persona persona = new Persona();
        persona.setId(id);
        return persona;
    }
}
