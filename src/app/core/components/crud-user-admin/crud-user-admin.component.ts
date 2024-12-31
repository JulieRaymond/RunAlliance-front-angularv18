import {Component, OnInit} from '@angular/core';
import {MessageService, ConfirmationService} from 'primeng/api';
import {User} from '../../../shared/models/user.model';
import {SharedModule} from "../../../shared/shared.module";
import {SelectButtonModule} from "primeng/selectbutton";
import {ManageUsersService} from "../../../shared/services/manage-users.service";

@Component({
  selector: 'app-crud-user-admin',
  standalone: true,
  imports: [
    SharedModule,
    SelectButtonModule,
  ],
  templateUrl: './crud-user-admin.component.html',
  styleUrls: ['./crud-user-admin.component.scss']
})
export class CrudUserAdminComponent implements OnInit {

  users: User[] = [];
  user: User = { id: 0, email: '', roles: [], password: '' };
  roles = ['ROLE_ADMIN', 'ROLE_USER'];
  userDialog = false;
  deleteUserDialog = false;
  deleteUsersDialog = false;
  submitted = false;
  selectedUsers: User[] = [];
  cols = [
    {field: 'email', header: 'Email'},
    {field: 'role', header: 'Rôle'}
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private manageUsersService: ManageUsersService
  ) {
  }

  openNew() {
    this.user = {id: 0, email: '', roles: [], password: ''};  // Réinitialiser le mot de passe
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: any) {
    // Utilisation d'un 'any' pour accepter la structure de l'API (avec 'roles')
    this.user = {
      id: user.id,
      email: user.email,
      roles: user.roles && user.roles[0] ? [user.roles[0]] : [],
      password: user.password || ''
    };
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  validEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  saveUser() {
    this.submitted = true;

    // Vérification si les champs sont valides
    if (this.user.email && this.validEmail(this.user.email) && this.user.roles) {
      const userToSave = { ...this.user };

      // Si l'utilisateur existe déjà, on met à jour sans toucher au mot de passe
      if (this.user.id) {
        if (!userToSave.password) {
          delete userToSave.password;
        }

        this.manageUsersService.updateUser(this.user.id, userToSave).subscribe(response => {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Utilisateur mis à jour'});
          this.loadUsers();
        });
      } else {
        // Si l'utilisateur est nouveau, on crée l'utilisateur avec un mot de passe
        this.manageUsersService.createUser(userToSave).subscribe(response => {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Utilisateur créé'});
          this.loadUsers();
        });
      }

      this.userDialog = false;
      this.user = {id: 0, email: '', roles: [], password: ''};  // Réinitialisation
    }
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = {...user};
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
    this.manageUsersService.deleteUsers(this.selectedUsers.map(u => u.id)).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Utilisateurs supprimés',
        life: 3000
      });
      this.loadUsers();
    });
    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.manageUsersService.deleteUser(this.user.id).subscribe(response => {
      this.users = this.users.filter((user) => user.id !== this.user.id);
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Utilisateur supprimé',
        life: 3000
      });
    });
    this.user = {id: 0, email: '', roles: []};
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadUsers() {
    this.manageUsersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
}
