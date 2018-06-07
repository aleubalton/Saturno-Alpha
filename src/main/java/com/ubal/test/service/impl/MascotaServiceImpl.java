package com.ubal.test.service.impl;

import com.ubal.test.service.MascotaService;
import com.ubal.test.domain.Mascota;
import com.ubal.test.repository.MascotaRepository;
import com.ubal.test.service.dto.MascotaDTO;
import com.ubal.test.service.mapper.MascotaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Mascota.
 */
@Service
@Transactional
public class MascotaServiceImpl implements MascotaService {

    private final Logger log = LoggerFactory.getLogger(MascotaServiceImpl.class);

    private final MascotaRepository mascotaRepository;

    private final MascotaMapper mascotaMapper;

    public MascotaServiceImpl(MascotaRepository mascotaRepository, MascotaMapper mascotaMapper) {
        this.mascotaRepository = mascotaRepository;
        this.mascotaMapper = mascotaMapper;
    }

    /**
     * Save a mascota.
     *
     * @param mascotaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MascotaDTO save(MascotaDTO mascotaDTO) {
        log.debug("Request to save Mascota : {}", mascotaDTO);
        Mascota mascota = mascotaMapper.toEntity(mascotaDTO);
        mascota = mascotaRepository.save(mascota);
        return mascotaMapper.toDto(mascota);
    }

    /**
     * Get all the mascotas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MascotaDTO> findAll() {
        log.debug("Request to get all Mascotas");
        return mascotaRepository.findAll().stream()
            .map(mascotaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one mascota by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MascotaDTO findOne(Long id) {
        log.debug("Request to get Mascota : {}", id);
        Mascota mascota = mascotaRepository.findOne(id);
        return mascotaMapper.toDto(mascota);
    }

    /**
     * Delete the mascota by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mascota : {}", id);
        mascotaRepository.delete(id);
    }
}
