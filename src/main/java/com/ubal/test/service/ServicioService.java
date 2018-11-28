package com.ubal.test.service;

import com.ubal.test.service.dto.ServicioDTO;
import java.util.List;

/**
 * Service Interface for managing Servicio.
 */
public interface ServicioService {

    /**
     * Save a servicio.
     *
     * @param servicioDTO the entity to save
     * @return the persisted entity
     */
    ServicioDTO save(ServicioDTO servicioDTO);

    /**
     * Get all the servicios.
     *
     * @return the list of entities
     */
    List<ServicioDTO> findAll();

    /**
     * Get the "id" servicio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServicioDTO findOne(Long id);

    /**
     * Delete the "id" servicio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
