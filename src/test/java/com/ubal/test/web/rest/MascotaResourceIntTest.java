package com.ubal.test.web.rest;

import com.ubal.test.JhipsterApp;

import com.ubal.test.domain.Mascota;
import com.ubal.test.repository.MascotaRepository;
import com.ubal.test.service.MascotaService;
import com.ubal.test.service.dto.MascotaDTO;
import com.ubal.test.service.mapper.MascotaMapper;
import com.ubal.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ubal.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MascotaResource REST controller.
 *
 * @see MascotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class MascotaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APODO = "AAAAAAAAAA";
    private static final String UPDATED_APODO = "BBBBBBBBBB";

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private MascotaMapper mascotaMapper;

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMascotaMockMvc;

    private Mascota mascota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MascotaResource mascotaResource = new MascotaResource(mascotaService);
        this.restMascotaMockMvc = MockMvcBuilders.standaloneSetup(mascotaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mascota createEntity(EntityManager em) {
        Mascota mascota = new Mascota()
            .nombre(DEFAULT_NOMBRE)
            .apodo(DEFAULT_APODO);
        return mascota;
    }

    @Before
    public void initTest() {
        mascota = createEntity(em);
    }

    @Test
    @Transactional
    public void createMascota() throws Exception {
        int databaseSizeBeforeCreate = mascotaRepository.findAll().size();

        // Create the Mascota
        MascotaDTO mascotaDTO = mascotaMapper.toDto(mascota);
        restMascotaMockMvc.perform(post("/api/mascotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mascotaDTO)))
            .andExpect(status().isCreated());

        // Validate the Mascota in the database
        List<Mascota> mascotaList = mascotaRepository.findAll();
        assertThat(mascotaList).hasSize(databaseSizeBeforeCreate + 1);
        Mascota testMascota = mascotaList.get(mascotaList.size() - 1);
        assertThat(testMascota.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testMascota.getApodo()).isEqualTo(DEFAULT_APODO);
    }

    @Test
    @Transactional
    public void createMascotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mascotaRepository.findAll().size();

        // Create the Mascota with an existing ID
        mascota.setId(1L);
        MascotaDTO mascotaDTO = mascotaMapper.toDto(mascota);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMascotaMockMvc.perform(post("/api/mascotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mascotaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mascota in the database
        List<Mascota> mascotaList = mascotaRepository.findAll();
        assertThat(mascotaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMascotas() throws Exception {
        // Initialize the database
        mascotaRepository.saveAndFlush(mascota);

        // Get all the mascotaList
        restMascotaMockMvc.perform(get("/api/mascotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mascota.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apodo").value(hasItem(DEFAULT_APODO.toString())));
    }

    @Test
    @Transactional
    public void getMascota() throws Exception {
        // Initialize the database
        mascotaRepository.saveAndFlush(mascota);

        // Get the mascota
        restMascotaMockMvc.perform(get("/api/mascotas/{id}", mascota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mascota.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apodo").value(DEFAULT_APODO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMascota() throws Exception {
        // Get the mascota
        restMascotaMockMvc.perform(get("/api/mascotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMascota() throws Exception {
        // Initialize the database
        mascotaRepository.saveAndFlush(mascota);
        int databaseSizeBeforeUpdate = mascotaRepository.findAll().size();

        // Update the mascota
        Mascota updatedMascota = mascotaRepository.findOne(mascota.getId());
        // Disconnect from session so that the updates on updatedMascota are not directly saved in db
        em.detach(updatedMascota);
        updatedMascota
            .nombre(UPDATED_NOMBRE)
            .apodo(UPDATED_APODO);
        MascotaDTO mascotaDTO = mascotaMapper.toDto(updatedMascota);

        restMascotaMockMvc.perform(put("/api/mascotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mascotaDTO)))
            .andExpect(status().isOk());

        // Validate the Mascota in the database
        List<Mascota> mascotaList = mascotaRepository.findAll();
        assertThat(mascotaList).hasSize(databaseSizeBeforeUpdate);
        Mascota testMascota = mascotaList.get(mascotaList.size() - 1);
        assertThat(testMascota.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testMascota.getApodo()).isEqualTo(UPDATED_APODO);
    }

    @Test
    @Transactional
    public void updateNonExistingMascota() throws Exception {
        int databaseSizeBeforeUpdate = mascotaRepository.findAll().size();

        // Create the Mascota
        MascotaDTO mascotaDTO = mascotaMapper.toDto(mascota);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMascotaMockMvc.perform(put("/api/mascotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mascotaDTO)))
            .andExpect(status().isCreated());

        // Validate the Mascota in the database
        List<Mascota> mascotaList = mascotaRepository.findAll();
        assertThat(mascotaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMascota() throws Exception {
        // Initialize the database
        mascotaRepository.saveAndFlush(mascota);
        int databaseSizeBeforeDelete = mascotaRepository.findAll().size();

        // Get the mascota
        restMascotaMockMvc.perform(delete("/api/mascotas/{id}", mascota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mascota> mascotaList = mascotaRepository.findAll();
        assertThat(mascotaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mascota.class);
        Mascota mascota1 = new Mascota();
        mascota1.setId(1L);
        Mascota mascota2 = new Mascota();
        mascota2.setId(mascota1.getId());
        assertThat(mascota1).isEqualTo(mascota2);
        mascota2.setId(2L);
        assertThat(mascota1).isNotEqualTo(mascota2);
        mascota1.setId(null);
        assertThat(mascota1).isNotEqualTo(mascota2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MascotaDTO.class);
        MascotaDTO mascotaDTO1 = new MascotaDTO();
        mascotaDTO1.setId(1L);
        MascotaDTO mascotaDTO2 = new MascotaDTO();
        assertThat(mascotaDTO1).isNotEqualTo(mascotaDTO2);
        mascotaDTO2.setId(mascotaDTO1.getId());
        assertThat(mascotaDTO1).isEqualTo(mascotaDTO2);
        mascotaDTO2.setId(2L);
        assertThat(mascotaDTO1).isNotEqualTo(mascotaDTO2);
        mascotaDTO1.setId(null);
        assertThat(mascotaDTO1).isNotEqualTo(mascotaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mascotaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mascotaMapper.fromId(null)).isNull();
    }
}
