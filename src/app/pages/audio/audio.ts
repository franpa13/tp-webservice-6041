import { Component, inject, signal, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideVolume2, lucideLoader, lucideMic } from '@ng-icons/lucide';
import { AudioService } from '../../services/audio.service';
import { HlmButton } from '../../../libs/button/src/lib/hlm-button';
import { HlmIcon } from '../../../libs/icon/src/lib/hlm-icon';
import { HlmBadge } from '../../../libs/badge/src/lib/hlm-badge';

export const VOICES = [
  { value: 'alloy',   label: 'Alloy',   desc: 'Neutral' },
  { value: 'echo',    label: 'Echo',    desc: 'Masculino' },
  { value: 'fable',   label: 'Fable',   desc: 'Narración' },
  { value: 'onyx',    label: 'Onyx',    desc: 'Profundo' },
  { value: 'nova',    label: 'Nova',    desc: 'Femenino' },
  { value: 'shimmer', label: 'Shimmer', desc: 'Suave' },
];

export const LANGUAGES = [
  { code: 'es', label: 'Español',   sample: 'Hola, bienvenido al conversor de texto a voz.' },
  { code: 'en', label: 'English',   sample: 'Hello, welcome to the text to speech converter.' },
  { code: 'fr', label: 'Français',  sample: 'Bonjour, bienvenue dans le convertisseur texte en parole.' },
  { code: 'pt', label: 'Português', sample: 'Olá, bem-vindo ao conversor de texto em fala.' },
  { code: 'de', label: 'Deutsch',   sample: 'Hallo, willkommen beim Text-zu-Sprache-Konverter.' },
  { code: 'it', label: 'Italiano',  sample: 'Ciao, benvenuto nel convertitore da testo a voce.' },
];

@Component({
  selector: 'app-audio',
  imports: [FormsModule, NgIcon, HlmButton, HlmIcon, HlmBadge],
  providers: [provideIcons({ lucideVolume2, lucideLoader, lucideMic })],
  templateUrl: './audio.html',
})
export class AudioComponent implements OnDestroy {
  private readonly audioService = inject(AudioService);

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  readonly voices = VOICES;
  readonly languages = LANGUAGES;

  text = LANGUAGES[0].sample;
  selectedVoice = 'nova';
  selectedLang = 'es';

  loading = signal(false);
  error = signal<string | null>(null);
  hasAudio = signal(false);

  private blobUrl: string | null = null;

  onLangChange(): void {
    const lang = this.languages.find(l => l.code === this.selectedLang);
    if (lang) this.text = lang.sample;
    this.hasAudio.set(false);
  }

  generate(): void {
    if (!this.text.trim()) return;
    this.loading.set(true);
    this.error.set(null);
    this.hasAudio.set(false);
    this.revokeBlob();

    this.audioService
      .textToSpeech({ model: 'tts-1', input: this.text, voice: this.selectedVoice })
      .subscribe({
        next: (blob) => {
          // Forzamos el MIME type correcto para garantizar que el browser lo reconozca
          const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
          this.blobUrl = URL.createObjectURL(audioBlob);

          // Seteamos el src directamente en el DOM para evitar el sanitizer de Angular
          this.hasAudio.set(true);
          this.loading.set(false);

          // Esperamos un tick para que el @if renderice el <audio> antes de setear src
          setTimeout(() => {
            if (this.audioPlayer?.nativeElement) {
              this.audioPlayer.nativeElement.src = this.blobUrl!;
              this.audioPlayer.nativeElement.load();
            }
          }, 0);
        },
        error: () => {
          this.error.set('Error al generar el audio. Verificá tu API Key de RapidAPI.');
          this.loading.set(false);
        },
      });
  }

  getLangLabel(): string {
    return this.languages.find(l => l.code === this.selectedLang)?.label ?? this.selectedLang;
  }

  private revokeBlob(): void {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.revokeBlob();
  }
}
