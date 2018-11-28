package com.ubal.test.service.impl;

import com.ubal.test.service.TurnoService;
import com.ubal.test.domain.Turno;
import com.ubal.test.repository.TurnoRepository;
import com.ubal.test.service.dto.TurnoDTO;
import com.ubal.test.service.mapper.TurnoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Turno.
 */
@Service
@Transactional
public class TurnoServiceImpl implements TurnoService {

    private final Logger log = LoggerFactory.getLogger(TurnoServiceImpl.class);

    private final TurnoRepository turnoRepository;

    private final TurnoMapper turnoMapper;

    public TurnoServiceImpl(TurnoRepository turnoRepository, TurnoMapper turnoMapper) {
        this.turnoRepository = turnoRepository;
        this.turnoMapper = turnoMapper;
    }

    /**
     * Save a turno.
     *
     * @param turnoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TurnoDTO save(TurnoDTO turnoDTO) {
        log.debug("Request to save Turno : {}", turnoDTO);
        Turno turno = turnoMapper.toEntity(turnoDTO);
        turno = turnoRepository.save(turno);
        return turnoMapper.toDto(turno);
    }

    /**
     * Get all the turnos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TurnoDTO> findAll() {
        log.debug("Request to get all Turnos");
        return turnoRepository.findAllWithEagerRelationships().stream()
            .map(turnoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one turno by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TurnoDTO findOne(Long id) {
        log.debug("Request to get Turno : {}", id);
        Turno turno = turnoRepository.findOneWithEagerRelationships(id);
        return turnoMapper.toDto(turno);
    }

    /**
     * Delete the turno by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Turno : {}", id);
        turnoRepository.delete(id);
    }
}
