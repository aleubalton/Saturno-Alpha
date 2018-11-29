package com.ubal.test.service.mapper;

import com.ubal.test.domain.*;
import com.ubal.test.service.dto.DiaNoLaborableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DiaNoLaborable and its DTO DiaNoLaborableDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DiaNoLaborableMapper extends EntityMapper<DiaNoLaborableDTO, DiaNoLaborable> {


    @Mapping(target = "agenda", ignore = true)
    DiaNoLaborable toEntity(DiaNoLaborableDTO diaNoLaborableDTO);

    default DiaNoLaborable fromId(Long id) {
        if (id == null) {
            return null;
        }
        DiaNoLaborable diaNoLaborable = new DiaNoLaborable();
        diaNoLaborable.setId(id);
        return diaNoLaborable;
    }
}
