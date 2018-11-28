package com.ubal.test.service;

import com.ubal.test.service.dto.AgendaDTO;
import java.util.List;

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
     * Get the "id" agenda.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AgendaDTO findOne(Long id);

    /**
     * Delete the "id" agenda.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
