# rectangles\

# Running?\
This does not have any back-end; You would need to supply a runner webserver. \
For me, "python3 -m http.server 8080" is nice easy tmp webserver. But any webserver would do. \
\
#Good?\
1: Boxes have an idea is their original X,Y,WIDTH and HEIGHT. This will be used a lot. \
2: It has handles so there is a concept of minimum height/width w/o interfering w/ the actual boxes \
3: It's data model _directly_ would support Angular/Ionic's 'always on' data streaming: Simply overwrite the variable 'data'\ with whatever well formed data and call factory.render() and it will paint itself. \
4a: Snapback when a box completely envelopes another box ( set a box's X,Y,WIDTH and HEIGHT back to orig values ) \
4b: Snapback when a box is completely enveloped another box ( set a box's X,Y,WIDTH and HEIGHT back to orig values ) \
5: Snapto: When a box overlaps w/ another this is a attempt to 'snapto' an apropo location. \
Example: 

          STEP1 before snapto: \
            ----------------
            * a            *
            *              *
            *       -------------------
            *       * b    *          *
            *       *      *          *
            ----------------          *
                    *                 *
                    *                 * 
                    -------------------
                    
                    
          STEP2 after snapto: 
          
            ----------------
            * a            *
            *              *
            ---------------------------
                    * b               *
                    *                 *
                    *                 *
                    *                 *
                    *                 * 
                    -------------------

# Bad?:
This version of not bother w/ properly placing rectangles onto the viewport initially - \
This version of not bother w/ properly placing rectangles onto the viewport from 'dragged on' boxes -\
This version's 'snapto' only cover some possble shapes. \


          
          
