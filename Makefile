all: install

.PHONY: install lint

install:
	install -d ~/.local/share/gnome-shell/extensions
	cp -a eval-gjs@ramottamado.dev/ ~/.local/share/gnome-shell/extensions/

lint:
	eslint eval-gjs@ramottamado.dev