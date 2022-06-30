
import Generator from "yeoman-generator"


export type Languages = "javascript" | "typescript" | "golang" | "dart" | "python" | "scala" | "openapi" | "protobuf"
export type ProjectTypes = "service" | "web" | "mobile" | "library" | "extension" | "db" 
export type Tools = "webpack" | "eslint" | "prettier" | "docker"
export type Ides = "vscode" | "idea" 
export type Libraries = "react" | "crx" | "jupyters"



export class Project {
    private generator: Generator
    private _scripts: Record<string, string> = {}
    private parentProject: Project

    constructor(generator: Generator, parentProject: Project) {
        this.generator = generator
        this.parentProject = parentProject
    }

    getWorkspaceRoot() {
        // TBD: adjust for monorepo
        return this.generator.destinationRoot()
    }

    getWorkspaceFile(filepath: string) {
    }

    get fs() {
        return this.generator.fs
    }

    destinationPath(filepath: string) {
        return this.generator.destinationPath(filepath)
    }

    templatePath(filepath: string) {
        return this.generator.templatePath(filepath)
    }

    addScripts(newScripts: Record<string, string>) {
        if (this.parentProject) {
            this.parentProject.addScripts(newScripts)
        } else {
            this._scripts = {...this._scripts, ...newScripts}
        }
    }

    get scripts(): Record<string, string> {
        if (this.parentProject) {
            return this.parentProject.scripts
        } else {
            return this._scripts
        }
    }

    readTemplateJson(templatePath: string): Record<string, any> {
        const val = this.fs.readJSON(this.generator.templatePath(templatePath))
        if (typeof val === 'object' && val !== null) {
            return val
        }
        throw new Error(`Error reading template file ${templatePath}`)
    }


    readTemplateFile(templatePath: string): string {
        return this.fs.read(this.generator.templatePath(templatePath))
    }

    copyTemplateFile(tmplPath: string, destPath: string, context?: Record<string, any>, overwrite: boolean = true) {
        if (!overwrite && this.fs.exists(this.destinationPath(destPath))) {
            console.log(`copyTemplateFile: Not copying template ${this.templatePath(tmplPath)} to ${this.destinationPath(destPath)}, as destination exists.`)
            return
        }
        this.fs.copyTpl(this.templatePath(tmplPath), this.destinationPath(destPath), context)
    }

    gitIgnoreFile() {
        return '.gitignore'
    }

}