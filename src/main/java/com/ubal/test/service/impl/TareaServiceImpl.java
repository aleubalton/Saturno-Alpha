package com.ubal.test.service.impl;

import com.ubal.test.service.TareaService;
import com.ubal.test.domain.Tarea;
import com.ubal.test.repository.TareaRepository;
import com.ubal.test.service.dto.TareaDTO;
import com.ubal.test.service.mapper.TareaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Tarea.
 */
@Service
@Transactional
public class TareaServiceImpl implements TareaService {

    private final Logger log = LoggerFactory.getLogger(TareaServiceImpl.class);

    private final TareaRepository tareaRepository;

    private final TareaMapper tareaMapper;

    public TareaServiceImpl(TareaRepository tareaRepository, TareaMapper tareaMapper) {
        this.tareaRepository = tareaRepository;
        this.tareaMapper = tareaMapper;
    }

    /**
     * Save a tarea.
     *
     * @param tareaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TareaDTO save(TareaDTO tareaDTO) {
        log.debug("Request to save Tarea : {}", tareaDTO);
        Tarea tarea = tareaMapper.toEntity(tareaDTO);
        tarea = tareaRepository.save(tarea);
        return tareaMapper.toDto(tarea);
    }

    /**
     * Get all the tareas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TareaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tareas");
        return tareaRepository.findAll(pageable)
            .map(tareaMapper::toDto);
    }

    /**
     * Get one tarea by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TareaDTO findOne(Long id) {
        log.debug("Request to get Tarea : {}", id);
        Tarea tarea = tareaRepository.findOne(id);
        return tareaMapper.toDto(tarea);
    }

    /**
     * Delete the tarea by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tarea : {}", id);
        tareaRepository.delete(id);
    }
}
