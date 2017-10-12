import { Component, Prop, PropWillChange, State } from '@stencil/core';

@Component({
	tag: 'iiif-explorer-breadcrumbtrail',
	styleUrl: 'iiif-explorer-breadcrumbtrail.scss'
})
export class IIIFExplorerBreadcrumbTrail {

    @Prop() collections: Manifesto.ICollection[];
    
    @State() data: Manifesto.ICollection[];
    
    @PropWillChange('collections')
    willChangeHandler(newValue: Manifesto.ICollection[]) {
        console.log('The new value of collections is: ', newValue);
        this.data = newValue;
    }

    componentWillLoad() {
        this.data = this.collections;
    }

    // @Method()
    // setCollections(collections: Manifesto.ICollection[]) {
    //     this.data = collections;
    // }

	render() {

        console.log(this.data.length);

		if (this.data.length) {
			return ( 
                <div class="breadcrumbs">
                    <span>{this.collections.length}</span>
                {
                    this.data.map((collection) => 
                        <iiif-explorer-breadcrumb collection={collection}></iiif-explorer-breadcrumb>
                    )
                }
                </div>
			)
		}
    }
}