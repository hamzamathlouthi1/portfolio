import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Skill { name: string; icon?: string; short?: string; }
interface SkillGroup { title: string; eyebrow: string; skills: Skill[]; }
interface Project { title: string; description: string; image: string; technologies: string[]; features: string[]; githubUrl: string; accent: string; }

@Component({ selector: 'app-root', standalone: true, templateUrl: './app.component.html', styleUrl: './app.component.css' })
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private revealObserver?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;
  private pointerFrame = 0;

  readonly year = new Date().getFullYear();
  readonly links = { github: 'https://github.com/hamzamathlouthi1', linkedin: 'https://www.linkedin.com/in/hamza-mathlouthi-4a2881406/' };
  readonly navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  activeSection = 'home'; menuOpen = false; selectedProject: Project | null = null; isDark = false; scrollProgress = 0;
  private readonly devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

  readonly groups: SkillGroup[] = [
    { eyebrow: '01', title: 'Programming', skills: [
      { name: 'Java', icon: `${this.devicon}/java/java-original.svg` }, { name: 'C#', icon: `${this.devicon}/csharp/csharp-original.svg` },
      { name: 'PHP', icon: `${this.devicon}/php/php-original.svg` }, { name: 'Python', icon: `${this.devicon}/python/python-original.svg` },
      { name: 'C', icon: `${this.devicon}/c/c-original.svg` }, { name: 'C++', icon: `${this.devicon}/cplusplus/cplusplus-original.svg` }
    ]},
    { eyebrow: '02', title: 'Backend', skills: [
      { name: 'Spring Boot', icon: `${this.devicon}/spring/spring-original.svg` }, { name: '.NET / ASP.NET', icon: `${this.devicon}/dotnetcore/dotnetcore-original.svg` },
      { name: 'Symfony', icon: `${this.devicon}/symfony/symfony-original.svg` }, { name: 'REST API', short: 'API' }, { name: 'Microservices', short: 'MS' }, { name: 'MVC', short: 'MVC' }, { name: 'OOP', short: 'OOP' }
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
      { name: 'CI/CD', short: 'CI' }, { name: 'Docker', icon: `${this.devicon}/docker/docker-original.svg` }, { name: 'Kubernetes', icon: `${this.devicon}/kubernetes/kubernetes-original.svg` },
      { name: 'Grafana', icon: `${this.devicon}/grafana/grafana-original.svg` }, { name: 'Azure DevOps', icon: `${this.devicon}/azuredevops/azuredevops-original.svg` }, { name: 'Version Control', icon: `${this.devicon}/git/git-original.svg` }
    ]},
    { eyebrow: '06', title: 'Software Engineering', skills: [
      { name: 'SDLC', short: 'SDLC' }, { name: 'Unit Testing', short: 'UT' }, { name: 'CRUD', short: 'CRUD' }, { name: 'Agile', short: 'AG' },
      { name: 'Scrum', short: 'SC' }, { name: 'UML', short: 'UML' }, { name: 'Linux', icon: `${this.devicon}/linux/linux-original.svg` }
    ]}
  ];

  readonly projects: Project[] = [
    { title: 'Skill2Job', description: 'A full-stack learning and certification platform connecting learners, trainers and partner companies with career opportunities.', image: 'images/projects/skill2job.png', technologies: ['Angular', 'Spring Boot', 'Java 17', 'MySQL', 'JWT', 'Microservices'], features: ['Online & onsite sessions', 'Courses & progress tracking', 'Exams & certificates', 'Partner job offers'], githubUrl: 'https://github.com/hamzamathlouthi1/skill2job_pi', accent: 'Learning → certification → opportunity' },
    { title: 'Rent Car', description: 'A full-stack car-rental platform with secure customer journeys, fleet administration and a resilient reservation workflow.', image: 'images/projects/rent-car.png', technologies: ['Angular', 'Spring Boot', 'Java 21', 'PostgreSQL', 'Docker', 'JWT'], features: ['Vehicle catalogue', 'Availability & overlap checks', 'Private identity documents', 'Admin approval workflow'], githubUrl: 'https://github.com/hamzamathlouthi1/rent_car', accent: 'Discover → reserve → drive' },
    { title: 'Travel Agency', description: 'A modern travel platform for destination discovery, hotel search and secure customer account experiences.', image: 'images/projects/travel-agency.png', technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Java 21', 'PostgreSQL', 'Docker'], features: ['Destination discovery', 'Hotel search interface', 'User registration', 'Email verification & JWT'], githubUrl: 'https://github.com/hamzamathlouthi1/travel_agency', accent: 'Discover → plan → experience' }
  ];

  constructor() {
    const saved = localStorage.getItem('hm-theme');
    this.isDark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme();
  }

  ngAfterViewInit(): void {
    const reveals = this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) reveals.forEach(el => el.classList.add('is-visible'));
    else {
      this.revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); this.revealObserver?.unobserve(entry.target); } }), { threshold: .12 });
      reveals.forEach(el => this.revealObserver?.observe(el));
    }
    this.sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) this.activeSection = entry.target.id; }), { rootMargin: '-35% 0px -55%' });
    this.navItems.forEach(id => { const section = this.document.getElementById(id); if (section) this.sectionObserver?.observe(section); });
  }
  ngOnDestroy(): void { this.revealObserver?.disconnect(); this.sectionObserver?.disconnect(); cancelAnimationFrame(this.pointerFrame); }
  @HostListener('window:scroll') onScroll(): void { const max = this.document.documentElement.scrollHeight - innerHeight; this.scrollProgress = max > 0 ? scrollY / max * 100 : 0; }
  @HostListener('window:mousemove', ['$event']) onPointerMove(event: MouseEvent): void {
    if (matchMedia('(pointer: coarse)').matches) return;
    cancelAnimationFrame(this.pointerFrame); this.pointerFrame = requestAnimationFrame(() => { this.host.nativeElement.style.setProperty('--pointer-x', `${event.clientX}px`); this.host.nativeElement.style.setProperty('--pointer-y', `${event.clientY}px`); });
  }
  @HostListener('document:keydown.escape') onEscape(): void { if (this.selectedProject) this.closeProject(); }
  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }
  toggleTheme(): void { this.isDark = !this.isDark; localStorage.setItem('hm-theme', this.isDark ? 'dark' : 'light'); this.applyTheme(); }
  openProject(project: Project): void { this.selectedProject = project; this.document.body.classList.add('modal-open'); }
  closeProject(): void { this.selectedProject = null; this.document.body.classList.remove('modal-open'); }
  private applyTheme(): void { this.document.documentElement.dataset['theme'] = this.isDark ? 'dark' : 'light'; }
}
