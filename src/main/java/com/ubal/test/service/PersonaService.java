package com.ubal.test.service;

import com.ubal.test.service.dto.PersonaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Persona.
 */
public interface PersonaService {

    /**
     * Save a persona.
     *
     * @param personaDTO the entity to save
     * @return the persisted entity
     */
    PersonaDTO save(PersonaDTO personaDTO);

    /**
     * Get all the personas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PersonaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" persona.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PersonaDTO findOne(Long id);

    /**
     * Delete the "id" persona.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
