package com.ubal.test.web.rest;

import com.ubal.test.JhipsterApp;

import com.ubal.test.domain.Persona;
import com.ubal.test.repository.PersonaRepository;
import com.ubal.test.service.PersonaService;
import com.ubal.test.service.dto.PersonaDTO;
import com.ubal.test.service.mapper.PersonaMapper;
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
 * Test class for the PersonaResource REST controller.
 *
 * @see PersonaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class PersonaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final Long DEFAULT_DNI = 1L;
    private static final Long UPDATED_DNI = 2L;

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PersonaMapper personaMapper;

    @Autowired
    private PersonaService personaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonaMockMvc;

    private Persona persona;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonaResource personaResource = new PersonaResource(personaService);
        this.restPersonaMockMvc = MockMvcBuilders.standaloneSetup(personaResource)
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
    public static Persona createEntity(EntityManager em) {
        Persona persona = new Persona()
            .nombre(DEFAULT_NOMBRE)
            .apellido(DEFAULT_APELLIDO)
            .dni(DEFAULT_DNI)
            .direccion(DEFAULT_DIRECCION);
        return persona;
    }

    @Before
    public void initTest() {
        persona = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersona() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona
        PersonaDTO personaDTO = personaMapper.toDto(persona);
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaDTO)))
            .andExpect(status().isCreated());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate + 1);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testPersona.getDni()).isEqualTo(DEFAULT_DNI);
        assertThat(testPersona.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
    }

    @Test
    @Transactional
    public void createPersonaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona with an existing ID
        persona.setId(1L);
        PersonaDTO personaDTO = personaMapper.toDto(persona);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDniIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setDni(null);

        // Create the Persona, which fails.
        PersonaDTO personaDTO = personaMapper.toDto(persona);

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaDTO)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonas() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList
        restPersonaMockMvc.perform(get("/api/personas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO.toString())))
            .andExpect(jsonPath("$.[*].dni").value(hasItem(DEFAULT_DNI.intValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())));
    }

    @Test
    @Transactional
    public void getPersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", persona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(persona.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO.toString()))
            .andExpect(jsonPath("$.dni").value(DEFAULT_DNI.intValue()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersona() throws Exception {
        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona
        Persona updatedPersona = personaRepository.findOne(persona.getId());
        // Disconnect from session so that the updates on updatedPersona are not directly saved in db
        em.detach(updatedPersona);
        updatedPersona
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .dni(UPDATED_DNI)
            .direccion(UPDATED_DIRECCION);
        PersonaDTO personaDTO = personaMapper.toDto(updatedPersona);

        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaDTO)))
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testPersona.getDni()).isEqualTo(UPDATED_DNI);
        assertThat(testPersona.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void updateNonExistingPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Create the Persona
        PersonaDTO personaDTO = personaMapper.toDto(persona);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaDTO)))
            .andExpect(status().isCreated());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);
        int databaseSizeBeforeDelete = personaRepository.findAll().size();

        // Get the persona
        restPersonaMockMvc.perform(delete("/api/personas/{id}", persona.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Persona.class);
        Persona persona1 = new Persona();
        persona1.setId(1L);
        Persona persona2 = new Persona();
        persona2.setId(persona1.getId());
        assertThat(persona1).isEqualTo(persona2);
        persona2.setId(2L);
        assertThat(persona1).isNotEqualTo(persona2);
        persona1.setId(null);
        assertThat(persona1).isNotEqualTo(persona2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonaDTO.class);
        PersonaDTO personaDTO1 = new PersonaDTO();
        personaDTO1.setId(1L);
        PersonaDTO personaDTO2 = new PersonaDTO();
        assertThat(personaDTO1).isNotEqualTo(personaDTO2);
        personaDTO2.setId(personaDTO1.getId());
        assertThat(personaDTO1).isEqualTo(personaDTO2);
        personaDTO2.setId(2L);
        assertThat(personaDTO1).isNotEqualTo(personaDTO2);
        personaDTO1.setId(null);
        assertThat(personaDTO1).isNotEqualTo(personaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(personaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(personaMapper.fromId(null)).isNull();
    }
}
