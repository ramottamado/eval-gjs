# POTENTIAL SECURITY BREACH

This extension enables arbitrary code execution via `Eval()` dbus method. This means when you enable this extension, malicious apps, extensions or scripts can call the said dbus method and run malicious GJS codes on your machine.

The extension at https://extensions.gnome.org/extension/5952/eval-gjs/ was not uploaded nor maintained by me. **Please refrain from installing this extension at all.**

# Eval GJS GNOME Shell Extension

As of GNOME 41, the dbus method `Eval()` is now restricted with `MetaContext:unsafe-mode` property (see this [commit](https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1970/diffs?commit_id=f42df5995e08a89495e2f59a9ed89b5c03369bf8)). This extension provides unrestricted `Eval()` dbus method for running arbitrary code in the compositor.

## Features

* Run arbitrary GJS code like you would with GNOME `Eval()` dbus method.
* `Main`, `Gio`, `GLib` and `Meta` available by default.

## Installation

```sh
git clone git://github.com/ramottamado/eval-gjs.git
cd eval-gjs
make install
```

## Example Usage

```sh
gdbus call \
  --session \
  --dest org.gnome.Shell \
  --object-path /dev/ramottamado/EvalGjs \
  --method dev.ramottamado.EvalGjs.Eval "Main.overview.show();"
```
