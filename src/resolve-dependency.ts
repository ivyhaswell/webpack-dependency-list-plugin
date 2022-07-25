import { Stats } from "webpack";
import { PathResolver } from "./path-resolve";

export type DependencyData = Record<string, string[]>;

export function resolveDependencyData(
  stats: Stats,
  pathResolver: PathResolver
): DependencyData {
  const { shouldPathResolved } = pathResolver;
  const { modules = [] } = stats.toJson();

  const map = new Map<string, Set<string>>();
  const result: DependencyData = {};

  for (const mod of modules) {
    const { name = "", reasons = [] } = mod;

    if (!shouldPathResolved(name)) {
      continue;
    }

    for (const reason of reasons) {
      const { moduleName = "" } = reason;

      if (!shouldPathResolved(moduleName)) {
        continue;
      }

      const deps = map.get(moduleName) || new Set<string>();
      deps.add(name);
      map.set(moduleName, deps);
    }
  }

  map.forEach((val, key) => {
    result[key] = Array.from(val);
  });

  return result;
}
