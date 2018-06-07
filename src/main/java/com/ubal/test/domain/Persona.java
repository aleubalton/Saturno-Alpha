package com.ubal.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @NotNull
    @Column(name = "dni", nullable = false)
    private Long dni;

    @Column(name = "direccion")
    private String direccion;

    @OneToMany(mappedBy = "persona")
    @JsonIgnore
    private Set<Mascota> mascotas = new HashSet<>();

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

    public Persona nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Persona apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Long getDni() {
        return dni;
    }

    public Persona dni(Long dni) {
        this.dni = dni;
        return this;
    }

    public void setDni(Long dni) {
        this.dni = dni;
    }

    public String getDireccion() {
        return direccion;
    }

    public Persona direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Set<Mascota> getMascotas() {
        return mascotas;
    }

    public Persona mascotas(Set<Mascota> mascotas) {
        this.mascotas = mascotas;
        return this;
    }

    public Persona addMascota(Mascota mascota) {
        this.mascotas.add(mascota);
        mascota.setPersona(this);
        return this;
    }

    public Persona removeMascota(Mascota mascota) {
        this.mascotas.remove(mascota);
        mascota.setPersona(null);
        return this;
    }

    public void setMascotas(Set<Mascota> mascotas) {
        this.mascotas = mascotas;
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", dni=" + getDni() +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
