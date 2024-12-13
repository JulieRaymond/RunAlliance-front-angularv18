import {Component} from '@angular/core';
import {MessageService, ConfirmationService} from 'primeng/api';
import {User} from '../../../shared/models/user.model';
import {SharedModule} from "../../../shared/shared.module";
import {SelectButtonModule} from "primeng/selectbutton";

@Component({
  selector: 'app-crud-user-admin',
  standalone: true,
  imports: [
    SharedModule,
    SelectButtonModule,
    // Ajoutez ici tous les imports nécessaires à votre composant
  ],
  templateUrl: './crud-user-admin.component.html',
  styleUrls: ['./crud-user-admin.component.scss']
})
export class CrudUserAdminComponent {

  users: User[] = []; // Liste des utilisateurs
  user: User = {id: 0, email: '', role: ''}; // Utilisateur en cours d'édition
  roles = [{label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}]; // Options de rôle
  userDialog = false; // Affichage du dialogue d'édition
  deleteUserDialog = false; // Dialogue de confirmation de suppression d'un utilisateur
  deleteUsersDialog = false; // Dialogue de suppression des utilisateurs sélectionnés
  submitted = false; // Flag pour valider la soumission
  selectedUsers: User[] = []; // Utilisateurs sélectionnés pour suppression
  cols = [
    {field: 'email', header: 'Email'},
    {field: 'role', header: 'Rôle'}
  ]; // Colonnes du tableau

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  // Ouvre le dialogue pour un nouvel utilisateur ou pour l'édition d'un utilisateur existant
  openNew() {
    this.user = {id: 0, email: '', role: ''}; // Réinitialise l'utilisateur
    this.submitted = false;
    this.userDialog = true; // Affiche le dialogue
  }

  // Affiche le dialogue avec les données de l'utilisateur à éditer
  editUser(user: User) {
    this.user = {...user}; // Clone les données de l'utilisateur sélectionné
    this.userDialog = true;
  }

  // Ferme le dialogue sans sauvegarder
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  // Valide l'email
  validEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  // Sauvegarde l'utilisateur (création ou mise à jour)
  saveUser() {
    this.submitted = true;

    // Vérifie si les données sont valides
    if (this.user.email && this.validEmail(this.user.email) && this.user.role) {
      if (this.user.id) {
        // Mise à jour de l'utilisateur existant
        const index = this.users.findIndex(u => u.id === this.user.id);
        if (index !== -1) {
          this.users[index] = this.user;
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Utilisateur mis à jour'});
        }
      } else {
        // Création d'un nouvel utilisateur
        this.user.id = this.users.length + 1; // Génère un ID fictif
        this.users.push(this.user);
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Utilisateur créé'});
      }
      this.userDialog = false; // Ferme le dialogue
      this.user = {id: 0, email: '', role: ''}; // Réinitialise l'utilisateur
    }
  }

  // Affiche le dialogue pour la suppression d'un utilisateur
  deleteUser(user: User) {
    this.deleteUserDialog = true; // Ouvre le dialogue de suppression
    this.user = {...user}; // Copie les données de l'utilisateur à supprimer
  }

  // Affiche le dialogue pour la suppression de plusieurs utilisateurs
  deleteSelectedUsers() {
    this.deleteUsersDialog = true; // Ouvre le dialogue de suppression multiple
  }

  // Confirmer la suppression des utilisateurs sélectionnés
  confirmDeleteSelected() {
    this.deleteUsersDialog = false; // Ferme le dialogue
    this.users = this.users.filter((user) => !this.selectedUsers.includes(user)); // Supprime les utilisateurs sélectionnés
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Utilisateurs supprimés',
      life: 3000
    });
    this.selectedUsers = []; // Réinitialise la sélection
  }

  // Confirmer la suppression d'un seul utilisateur
  confirmDelete() {
    this.deleteUserDialog = false; // Ferme le dialogue
    this.users = this.users.filter((user) => user.id !== this.user.id); // Supprime l'utilisateur
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Utilisateur supprimé',
      life: 3000
    });
    this.user = {id: 0, email: '', role: ''}; // Réinitialise l'utilisateur
  }

  // Filtrage global du tableau
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
