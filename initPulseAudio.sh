#! /bin/bash

# create sinks
pacmd load-module module-null-sink sink_name=SoundBoardMixed sink_properties=device.description=SoundBoardMixed
pacmd load-module module-null-sink sink_name=SoundBoardOnly sink_properties=device.description=SoundBoardOnly

# loopback mic into SoundBoardMixed
pacmd load-module module-loopback latency_msec=1 source=alsa_input.pci-0000_04_00.6.analog-stereo sink=SoundBoardMixed
# loopback soundboard into SoundBoardMixed
pacmd load-module module-loopback latency_msec=1 source=SoundBoardOnly.monitor sink=SoundBoardMixed

# play soundboard locally
ffplay -fflags nobuffer -f pulse -i SoundBoardOnly.monitor -nodisp

#pacmd load-module module-loopback source=SoundBoardOnly.monitor sink=alsa_output.pci-0000_04_00.6.analog-stereo latency_msec=1
