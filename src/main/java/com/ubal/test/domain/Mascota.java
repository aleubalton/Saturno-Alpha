package com.ubal.test.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Mascota.
 */
@Entity
@Table(name = "mascota")
public class Mascota implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apodo")
    private String apodo;

    @ManyToOne
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Mascota nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApodo() {
        return apodo;
    }

    public Mascota apodo(String apodo) {
        this.apodo = apodo;
        return this;
    }

    public void setApodo(String apodo) {
        this.apodo = apodo;
    }

    public Persona getPersona() {
        return persona;
    }

    public Mascota persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mascota mascota = (Mascota) o;
        if (mascota.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mascota.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mascota{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apodo='" + getApodo() + "'" +
            "}";
    }
}
