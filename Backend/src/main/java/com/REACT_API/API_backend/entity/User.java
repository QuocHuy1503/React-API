package com.REACT_API.API_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Builder
@Table(name="users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @Column(nullable = false, name = "id")
    private Long id;


//    @Column(nullable = false, name = "password")
    private String password;

//    @Column(nullable = false, name = "email")
    private String email;

//    @Column(nullable = false, name = "first_name")
    private String first_name;

//    @Column(nullable = false, name = "last_name")
    private String last_name;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;    }

    @Override
    public boolean isEnabled() {
        return true;    }
}
