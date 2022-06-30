import { Context, type Spec } from 'immutability-helper'
import { type Project } from './Project.js'


export class ProjectFile {
    private project: Project
    private filepath: string
    private useWorkspace: any

    constructor(project: Project, filepath: string, useWorkspace: boolean = false) {
        this.project = project
        this.filepath = filepath
        this.useWorkspace = useWorkspace
    }

    exists() {
        return this.project.fs.exists(this.filepath)
    }

    readString() {
        if (this.exists()) {
            return this.project.fs.read(this.project.destinationPath(this.filepath))
        } else {
            throw new Error(`File ${this.filepath} does not exist`)
        }
    }

    writeString(str: string) {
        return this.project.fs.write(this.project.destinationPath(this.filepath), str)
    }

}

const globalContext = new Context()


class Json extends ProjectFile {
    private _content: Record<string, any>
    private ctx: Context

    constructor(project: Project, filepath: string, ctx: Context = globalContext, useWorkspace: boolean = false) {
        super(project, filepath, useWorkspace)
        this.ctx = ctx
        this._content = {}
    }

    get content() {
        return this._content
    }

    load() {
        if (this.exists()) {
            this._content = JSON.parse(this.readString())
        }
        return this
    }

    merge(updateObj: any ) { // Spec<Record<string, any>, never>
        this._content = this.ctx.update(this._content, updateObj)
        return this
    }

    save() {
        this.writeString(JSON.stringify(this._content, null, 2))
        return this
    }

}

class IgnoreFile extends ProjectFile {
    private _content: string[] = []

    get content() {
        return this._content
    }

    load() {
        if (this.exists()) {
            this._content = this.readString().split("\n");
        } 
        return this
    }

    private filterDuplicates(ignore: string[], checkIgnore: string[]) {
        const filteredCheck:string[] = []

        const popComments = () => {
            while (filteredCheck.length > 0 && filteredCheck[filteredCheck.length - 1].startsWith('#')) {
                filteredCheck.length = filteredCheck.length - 1
            }
        }

        for (const ignoreItem of checkIgnore) {
            console.log(`next: ${ignoreItem}`)
            if (ignoreItem.startsWith('#')) {
                filteredCheck.push(ignoreItem)
            } else if (ignore.includes(ignoreItem)) {
                popComments()
            } else {
                filteredCheck.push(ignoreItem)
            }
        }

        return filteredCheck
    }

    remove(ignoreFile: string) {
        const ignore = ignoreFile.split('\n')
        this._content = [...this.filterDuplicates(ignore, this.content)]
        return this
    }

    add(ignoreFile: string ) { 
        const ignore = ignoreFile.split('\n')
        this._content = [...ignore, ...this.filterDuplicates(ignore, this.content)]
        return this
    }

    save() {
        this.writeString(this.content.join('\n') + '\n')
        return this
    }

}


export function json(project: Project, filepath: string, useWorkspace: boolean = false) {
    return new Json(project, filepath, globalContext, useWorkspace)
}

export function ignoreFile(project: Project, filepath: string, useWorkspace: boolean = false) {
    return new IgnoreFile(project, filepath, useWorkspace)
}

export function addMissingKey(value: any): any  {
    return function (current: any) {
        if (current) {
        return Object.assign( value , current)
        } else {
        return Object.assign({}, )
        }
    }
}