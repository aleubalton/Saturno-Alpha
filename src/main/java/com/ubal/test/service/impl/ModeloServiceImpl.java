package com.ubal.test.service.impl;

import com.ubal.test.service.ModeloService;
import com.ubal.test.domain.Modelo;
import com.ubal.test.repository.ModeloRepository;
import com.ubal.test.service.dto.ModeloDTO;
import com.ubal.test.service.mapper.ModeloMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Modelo.
 */
@Service
@Transactional
public class ModeloServiceImpl implements ModeloService {

    private final Logger log = LoggerFactory.getLogger(ModeloServiceImpl.class);

    private final ModeloRepository modeloRepository;

    private final ModeloMapper modeloMapper;

    public ModeloServiceImpl(ModeloRepository modeloRepository, ModeloMapper modeloMapper) {
        this.modeloRepository = modeloRepository;
        this.modeloMapper = modeloMapper;
    }

    /**
     * Save a modelo.
     *
     * @param modeloDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ModeloDTO save(ModeloDTO modeloDTO) {
        log.debug("Request to save Modelo : {}", modeloDTO);

        Modelo modelo = modeloMapper.toEntity(modeloDTO);
        modelo = modeloRepository.save(modelo);
        return modeloMapper.toDto(modelo);
    }

    /**
     * Get all the modelos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ModeloDTO> findAll() {
        log.debug("Request to get all Modelos");
        return modeloRepository.findAll().stream()
            .map(modeloMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one modelo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ModeloDTO> findOne(Long id) {
        log.debug("Request to get Modelo : {}", id);
        return modeloRepository.findById(id)
            .map(modeloMapper::toDto);
    }

    /**
     * Delete the modelo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Modelo : {}", id);
        modeloRepository.deleteById(id);
    }
}
