package com.ubal.test.service;

import com.ubal.test.service.dto.MascotaDTO;
import java.util.List;

/**
 * Service Interface for managing Mascota.
 */
public interface MascotaService {

    /**
     * Save a mascota.
     *
     * @param mascotaDTO the entity to save
     * @return the persisted entity
     */
    MascotaDTO save(MascotaDTO mascotaDTO);

    /**
     * Get all the mascotas.
     *
     * @return the list of entities
     */
    List<MascotaDTO> findAll();

    /**
     * Get the "id" mascota.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MascotaDTO findOne(Long id);

    /**
     * Delete the "id" mascota.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
