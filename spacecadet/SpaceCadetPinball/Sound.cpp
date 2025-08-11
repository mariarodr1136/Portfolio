#include "pch.h"
#include "Sound.h"


int Sound::num_channels;
unsigned int Sound::enabled_flag = -1;

int Sound::Init(int voices)
{
	int channelCount = voices;
	if (voices > 8)
		channelCount = 8;
	num_channels = channelCount;

	int flags = 0;
#ifdef MUSIC_SDL
	flags |= MIX_INIT_MID;
#endif

	auto init = Mix_Init(flags);
	if (init == 0)
	{
		printf("Sound::Init Mix_Init returned 0 (no flags) SDL_mixer error: %s\n", Mix_GetError());
	}
	else
	{
		printf("Sound::Init Mix_Init flags=0x%x\n", init);
	}
	int openResult = Mix_OpenAudio(MIX_DEFAULT_FREQUENCY, AUDIO_S16LSB, 2, 1024);
	printf("Sound::Init voices=%d (clamped=%d) Mix_OpenAudio result=%d enabled_flag(before Enable)=%u\n", voices, channelCount, openResult, enabled_flag);
	return openResult;
}

void Sound::Enable(int channelFrom, int channelTo, int enableFlag)
{
	enabled_flag = enableFlag ? -1 : 0;
	printf("Sound::Enable from=%d to=%d enableFlag=%d -> enabled_flag=%u\n", channelFrom, channelTo, enableFlag, enabled_flag);
}

void Sound::Activate()
{
	Mix_Resume(-1);
}

void Sound::Deactivate()
{
	Mix_Pause(-1);
}

void Sound::Close()
{
	Mix_CloseAudio();
	Mix_Quit();
}

void Sound::PlaySound(Mix_Chunk* wavePtr, int minChannel, int maxChannel, unsigned int dwFlags, int16_t loops)
{
	static int playCount = 0;
	if (wavePtr && enabled_flag)
	{
		if (playCount < 20)
		{
			printf("Sound::PlaySound #%d loops=%d enabled_flag=%u\n", playCount, loops, enabled_flag);
		}
		playCount++;
		Mix_PlayChannel(-1, wavePtr, loops);
	}
}

Mix_Chunk* Sound::LoadWaveFile(std::string lpName)
{
	auto wavFile = fopen(lpName.c_str(), "r");
	if (!wavFile)
		return nullptr;
	fclose(wavFile);
	auto chunk = Mix_LoadWAV(lpName.c_str());
	if (!chunk)
	{
		printf("Sound::LoadWaveFile failed path=%s error=%s\n", lpName.c_str(), Mix_GetError());
	}
	else
	{
		static int loadedCount = 0;
		if (loadedCount < 20)
		{
			printf("Sound::LoadWaveFile loaded #%d path=%s\n", loadedCount, lpName.c_str());
		}
		loadedCount++;
	}
	return chunk;
}

void Sound::FreeSound(Mix_Chunk* wave)
{
	if (wave)
		Mix_FreeChunk(wave);
}
