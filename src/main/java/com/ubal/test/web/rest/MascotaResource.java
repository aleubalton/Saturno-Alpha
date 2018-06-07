package com.ubal.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ubal.test.service.MascotaService;
import com.ubal.test.web.rest.errors.BadRequestAlertException;
import com.ubal.test.web.rest.util.HeaderUtil;
import com.ubal.test.service.dto.MascotaDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mascota.
 */
@RestController
@RequestMapping("/api")
public class MascotaResource {

    private final Logger log = LoggerFactory.getLogger(MascotaResource.class);

    private static final String ENTITY_NAME = "mascota";

    private final MascotaService mascotaService;

    public MascotaResource(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    /**
     * POST  /mascotas : Create a new mascota.
     *
     * @param mascotaDTO the mascotaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mascotaDTO, or with status 400 (Bad Request) if the mascota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mascotas")
    @Timed
    public ResponseEntity<MascotaDTO> createMascota(@RequestBody MascotaDTO mascotaDTO) throws URISyntaxException {
        log.debug("REST request to save Mascota : {}", mascotaDTO);
        if (mascotaDTO.getId() != null) {
            throw new BadRequestAlertException("A new mascota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MascotaDTO result = mascotaService.save(mascotaDTO);
        return ResponseEntity.created(new URI("/api/mascotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mascotas : Updates an existing mascota.
     *
     * @param mascotaDTO the mascotaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mascotaDTO,
     * or with status 400 (Bad Request) if the mascotaDTO is not valid,
     * or with status 500 (Internal Server Error) if the mascotaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mascotas")
    @Timed
    public ResponseEntity<MascotaDTO> updateMascota(@RequestBody MascotaDTO mascotaDTO) throws URISyntaxException {
        log.debug("REST request to update Mascota : {}", mascotaDTO);
        if (mascotaDTO.getId() == null) {
            return createMascota(mascotaDTO);
        }
        MascotaDTO result = mascotaService.save(mascotaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mascotaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mascotas : get all the mascotas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mascotas in body
     */
    @GetMapping("/mascotas")
    @Timed
    public List<MascotaDTO> getAllMascotas() {
        log.debug("REST request to get all Mascotas");
        return mascotaService.findAll();
        }

    /**
     * GET  /mascotas/:id : get the "id" mascota.
     *
     * @param id the id of the mascotaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mascotaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mascotas/{id}")
    @Timed
    public ResponseEntity<MascotaDTO> getMascota(@PathVariable Long id) {
        log.debug("REST request to get Mascota : {}", id);
        MascotaDTO mascotaDTO = mascotaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mascotaDTO));
    }

    /**
     * DELETE  /mascotas/:id : delete the "id" mascota.
     *
     * @param id the id of the mascotaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mascotas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMascota(@PathVariable Long id) {
        log.debug("REST request to delete Mascota : {}", id);
        mascotaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
