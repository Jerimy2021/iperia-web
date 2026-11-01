{
  description = "Entorno de desarrollo para iperia-web";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            gh
          ];

          shellHook = ''
            echo "Bienvenido al entorno iperia-web"

            if command -v node &> /dev/null; then
              echo "Node Version: $(node --version)"
            fi

            if command -v npm &> /dev/null; then
              echo "npm Version: $(npm --version)"
            fi

            if command -v gh &> /dev/null; then
              echo "GitHub CLI Version: $(gh --version | head -n1)"
            fi

            echo "--------------------------------------------------------"
            echo "Sistema detectado: ${system}"
            echo "--------------------------------------------------------"
          '';
        };
      }
    );
}
