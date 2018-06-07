package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.MascotaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mascota and its DTO MascotaDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonaMapper.class})
public interface MascotaMapper extends EntityMapper<MascotaDTO, Mascota> {

    @Mapping(source = "persona.id", target = "personaId")
    MascotaDTO toDto(Mascota mascota);

    @Mapping(source = "personaId", target = "persona")
    Mascota toEntity(MascotaDTO mascotaDTO);

    default Mascota fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mascota mascota = new Mascota();
        mascota.setId(id);
        return mascota;
    }
}
