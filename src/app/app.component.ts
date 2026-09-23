import { Component } from '@angular/core';

interface Skill { name: string; icon?: string; short?: string; }
interface SkillGroup { title: string; eyebrow: string; skills: Skill[]; }

@Component({ selector: 'app-root', standalone: true, templateUrl: './app.component.html', styleUrl: './app.component.css' })
export class AppComponent {
  readonly year = new Date().getFullYear();
  readonly links = {
    github: 'https://github.com/hamzamathlouthi1',
    linkedin: 'https://www.linkedin.com/in/hamza-mathlouthi-4a2881406/'
  };
  private readonly devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
  readonly groups: SkillGroup[] = [
    { eyebrow: '01', title: 'Programming', skills: [
      { name: 'Java', icon: `${this.devicon}/java/java-original.svg` }, { name: 'C#', icon: `${this.devicon}/csharp/csharp-original.svg` },
      { name: 'PHP', icon: `${this.devicon}/php/php-original.svg` }, { name: 'Python', icon: `${this.devicon}/python/python-original.svg` },
      { name: 'C', icon: `${this.devicon}/c/c-original.svg` }, { name: 'C++', icon: `${this.devicon}/cplusplus/cplusplus-original.svg` }
    ]},
    { eyebrow: '02', title: 'Backend', skills: [
      { name: 'Spring Boot', icon: `${this.devicon}/spring/spring-original.svg` }, { name: '.NET / ASP.NET', icon: `${this.devicon}/dotnetcore/dotnetcore-original.svg` },
      { name: 'Symfony', icon: `${this.devicon}/symfony/symfony-original.svg` }, { name: 'REST API', short: 'API' },
      { name: 'Microservices', short: 'MS' }, { name: 'MVC', short: 'MVC' }, { name: 'OOP', short: 'OOP' }
    ]},
    { eyebrow: '03', title: 'Frontend', skills: [
      { name: 'Angular', icon: `${this.devicon}/angular/angular-original.svg` }, { name: 'JavaFX', icon: `${this.devicon}/java/java-original.svg` },
      { name: 'FlutterFlow', icon: `${this.devicon}/flutter/flutter-original.svg` }, { name: 'HTML', icon: `${this.devicon}/html5/html5-original.svg` }
    ]},
    { eyebrow: '04', title: 'Databases', skills: [
      { name: 'MySQL', icon: `${this.devicon}/mysql/mysql-original.svg` }, { name: 'SQL', icon: `${this.devicon}/azuresqldatabase/azuresqldatabase-original.svg` },
      { name: 'Relational Data Modeling', short: 'RDM' }, { name: 'phpMyAdmin', icon: `${this.devicon}/php/php-original.svg` }
    ]},
    { eyebrow: '05', title: 'DevOps', skills: [
      { name: 'CI/CD', short: 'CI' }, { name: 'Docker', icon: `${this.devicon}/docker/docker-original.svg` },
      { name: 'Kubernetes', icon: `${this.devicon}/kubernetes/kubernetes-original.svg` }, { name: 'Grafana', icon: `${this.devicon}/grafana/grafana-original.svg` },
      { name: 'Azure DevOps', icon: `${this.devicon}/azuredevops/azuredevops-original.svg` }, { name: 'Version Control', icon: `${this.devicon}/git/git-original.svg` }
    ]},
    { eyebrow: '06', title: 'Software Engineering', skills: [
      { name: 'SDLC', short: 'SDLC' }, { name: 'Unit Testing', short: 'UT' }, { name: 'CRUD', short: 'CRUD' },
      { name: 'Agile', short: 'AG' }, { name: 'Scrum', short: 'SC' }, { name: 'UML', short: 'UML' },
      { name: 'Linux', icon: `${this.devicon}/linux/linux-original.svg` }
    ]}
  ];
}
