package com.ubal.test.service;

import com.ubal.test.service.dto.AgendaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Agenda.
 */
public interface AgendaService {

    /**
     * Save a agenda.
     *
     * @param agendaDTO the entity to save
     * @return the persisted entity
     */
    AgendaDTO save(AgendaDTO agendaDTO);

    /**
     * Get all the agenda.
     *
     * @return the list of entities
     */
    List<AgendaDTO> findAll();

    /**
     * Get all the Agenda with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<AgendaDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" agenda.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AgendaDTO> findOne(Long id);

    /**
     * Delete the "id" agenda.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
