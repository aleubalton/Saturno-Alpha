package com.ubal.test.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Mascota entity.
 */
public class MascotaDTO implements Serializable {

    private Long id;

    private String nombre;

    private String apodo;

    private Long personaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApodo() {
        return apodo;
    }

    public void setApodo(String apodo) {
        this.apodo = apodo;
    }

    public Long getPersonaId() {
        return personaId;
    }

    public void setPersonaId(Long personaId) {
        this.personaId = personaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MascotaDTO mascotaDTO = (MascotaDTO) o;
        if(mascotaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mascotaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MascotaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apodo='" + getApodo() + "'" +
            "}";
    }
}
